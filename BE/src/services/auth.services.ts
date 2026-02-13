import { TokenType } from '~/constants/enums.js'
import { USERS_MESSAGE } from '~/constants/messages.js'
import { StringValue } from '~/constants/types.js'
import { Member } from '~/models/index.js'
import { signToken, verifyToken } from '~/utils/jwt.js'
import { deleteRefreshToken, existsRefreshToken, getUserIdFromRedis, saveRefreshToken } from './redis.services.js'
import { TokenPayload } from '~/types/jwt/jwt.js'
import { randomUUID } from 'node:crypto'
import { hashFunction } from '~/utils/hash.js'
import { RegisterPayload } from '~/types/requests/requestPayload.js'
import memberService from './member.services.js'

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
    const member = await Member.findOne({ email })
    const passwordhash = hashFunction(password)
    if (!member || passwordhash !== member.password) {
      throw new Error(USERS_MESSAGE.EMAIL_OR_PASSWORD_IS_INCORRECT)
    }
    const accessToken = await this.signAccessToken(member._id.toString(), member.isAdmin)
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
    const userId = (payload as TokenPayload).userId
    const user = await memberService.getMemberById(userId)

    if (payload.tokenType !== TokenType.RefreshToken) {
      throw new Error(USERS_MESSAGE.REFRESH_TOKEN_IS_INVALID)
    }
    //check redis có tồn tại refreshToken hay không
    const exists = await existsRefreshToken(payload.jti as string)
    // console.log(exists)
    if (!exists) {
      throw new Error(USERS_MESSAGE.REFRESH_TOKEN_IS_INVALID)
    }
    //check userID có đúng với userID trong redis hay không
    const redisUserId = await getUserIdFromRedis(payload.jti as string)
    if (!redisUserId || redisUserId !== userId) {
      throw new Error(USERS_MESSAGE.REFRESH_TOKEN_IS_INVALID)
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
    if (isEmailExists) throw new Error(USERS_MESSAGE.EMAIL_ALREADY_EXISTS)
    const newMember = await Member.create({ ...payload, password: hashFunction(payload.password) })
    // console.log(newMember._id) // đã có
    const accessToken = await this.signAccessToken(newMember._id.toString(), newMember.isAdmin)
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
}
const authService = new AuthService()
export default authService
