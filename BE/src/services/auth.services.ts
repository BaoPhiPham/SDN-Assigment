import { TokenType } from '~/constants/enums.js'
import { USERS_MESSAGE } from '~/constants/messages.js'
import { StringValue } from '~/constants/types.js'
import { Member } from '~/models/index.js'
import { signToken, verifyToken } from '~/utils/jwt.js'
import { deleteRefreshToken, existsRefreshToken, getUserIdFromRedis, saveRefreshToken } from './redis.services.js'
import { TokenPayload } from '~/types/jwt/jwt.js'
import { randomUUID } from 'node:crypto'
import { comparePassword, hashPassword } from '~/utils/hash.js'
import { GoogleRegisterPayload, RegisterPayload } from '~/types/requests/requestPayload.js'
import memberService from './member.services.js'
import { ErrorWithStatus } from '~/models/error.model.js'
import HTTP_STATUS from '~/constants/httpStatus.js'

class AuthService {
  signAccessToken(userId: string, isAdmin: boolean) {
    return signToken({
      //payload phải gồm những tk ở dưới và có thể thêm nửa
      payload: {
        userId,
        tokenType: TokenType.AccessToken,
        isAdmin
      },
      privateKey: process.env.JWT_SECRET as string,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_JWT_EXPIRES_IN as StringValue
      }
    })
  }
  signRefreshToken(userId: string, jti: string) {
    return signToken({
      payload: {
        userId,
        tokenType: TokenType.RefreshToken,
        jti //dưa vào payload thì ko đc đưa vào options
      },
      privateKey: process.env.JWT_SECRET as string,
      options: {
        expiresIn: process.env.REFRESH_TOKEN_JWT_EXPIRES_IN as StringValue
      }
    })
  }

  async loginService(email: string, password: string) {
    const member = await Member.findOne({ email, is_deleted: { $ne: true } })
    if (!member) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.EMAIL_OR_PASSWORD_IS_INCORRECT, //
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
    const isMatch = await comparePassword(password, member.password as string)
    if (!isMatch) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.EMAIL_OR_PASSWORD_IS_INCORRECT, //
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
    const accessToken = await this.signAccessToken(member._id.toString(), member.isAdmin as boolean)
    const jti = randomUUID()
    const refreshToken = await this.signRefreshToken(member._id.toString(), jti)
    //redis
    await saveRefreshToken({
      jti: jti,
      userId: member._id.toString()
    })
    return {
      accessToken,
      refreshToken
    }
  }
  async refreshTokenService(token: string) {
    const payload = await verifyToken({
      token, //
      secretKey: process.env.JWT_SECRET as string
    })

    if (payload.tokenType !== TokenType.RefreshToken) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.REFRESH_TOKEN_IS_INVALID, //
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    const userId = (payload as TokenPayload).userId

    const user = await memberService.getMemberById(userId)

    //check redis có tồn tại refreshToken hay không
    const exists = await existsRefreshToken(payload.jti as string)
    // console.log(exists)
    if (!exists) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.REFRESH_TOKEN_IS_INVALID, //
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    //check userID có đúng với userID trong redis hay không
    const redisUserId = await getUserIdFromRedis(payload.jti as string)
    if (!redisUserId || redisUserId !== userId) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.REFRESH_TOKEN_IS_INVALID, //
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    //xóa token cũ trong redis
    await deleteRefreshToken(payload.jti as string)
    //tạo token mới
    const newAccessToken = await this.signAccessToken(user._id.toString(), user.isAdmin as boolean)
    const jti = randomUUID()
    const newRefreshToken = await this.signRefreshToken(user._id.toString(), jti)
    //lưu token mới vào redis
    await saveRefreshToken({
      jti: jti,
      userId: userId
    })
    return {
      newAccessToken,
      newRefreshToken
    }
  }
  async registerService(payload: RegisterPayload) {
    //check email
    const isEmailExists = await authService.checkEmailService(payload.email)
    if (isEmailExists) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.EMAIL_ALREADY_EXISTS, //
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
    //tạo tk
    const newMember = await Member.create({
      ...payload,
      password: await hashPassword(payload.password as string)
    })
    const accessToken = await this.signAccessToken(newMember._id.toString(), newMember.isAdmin as boolean)
    const jti = randomUUID()
    const refreshToken = await this.signRefreshToken(newMember._id.toString(), jti)
    //redis
    await saveRefreshToken({
      jti: jti,
      userId: newMember._id.toString()
    })
    return {
      accessToken,
      refreshToken
    }
  }

  async checkEmailService(email: string) {
    const member = await Member.findOne({ email }).select('-password')
    if (member) return true
    return false
  }
  async logoutService(token: string) {
    const decodedToken = await verifyToken({
      token,
      secretKey: process.env.JWT_SECRET as string
    })
    await deleteRefreshToken(decodedToken.jti as string)
  }
  async googleRegisterService(payload: GoogleRegisterPayload) {
    const newMember = await Member.create({
      ...payload
    })
    const accessToken = await this.signAccessToken(newMember._id.toString(), newMember.isAdmin as boolean)
    const jti = randomUUID()
    const refreshToken = await this.signRefreshToken(newMember._id.toString(), jti)
    //redis
    await saveRefreshToken({
      jti: jti,
      userId: newMember._id.toString()
    })
    return {
      accessToken,
      refreshToken
    }
  }
  async loginGoogleService(email: string, sub: string) {
    const member = await Member.findOne({ email, is_deleted: { $ne: true } })
    if (!member) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.USER_NOT_FOUND, //
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const isMatch = member.googleId === sub
    if (!isMatch) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.GOOGLE_AUTHENTICATION_FAILED, //
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    const accessToken = await this.signAccessToken(member._id.toString(), member.isAdmin as boolean)
    const jti = randomUUID()
    const refreshToken = await this.signRefreshToken(member._id.toString(), jti)
    //redis
    await saveRefreshToken({
      jti: jti,
      userId: member._id.toString()
    })
    return {
      accessToken,
      refreshToken
    }
  }
}
const authService = new AuthService()
export default authService
