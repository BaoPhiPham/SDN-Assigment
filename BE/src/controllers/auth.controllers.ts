import { Request, Response } from 'express'
import { USERS_MESSAGE } from '~/constants/messages.js'
import authService from '~/services/auth.services.js'
import { clearRefreshCookie, setRefreshCookie } from './cookie.controllers.js'
import { matchedData } from 'express-validator'
import { LoginPayload, RegisterPayload } from '~/types/requests/requestPayload.js'
import HTTP_STATUS from '~/constants/httpStatus.js'
import { OAuth2Client } from 'google-auth-library'
import { ErrorWithStatus } from '~/models/error.model.js'

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginPayload
  const { accessToken, refreshToken } = await authService.loginService(email, password)

  setRefreshCookie(res, refreshToken)

  res.status(HTTP_STATUS.OK).json({ message: USERS_MESSAGE.LOGIN_SUCCESS, accessToken })
}

export const refreshTokenController = async (req: Request, res: Response) => {
  const { newAccessToken, newRefreshToken } = await authService.refreshTokenService(req.refreshToken as string)
  setRefreshCookie(res, newRefreshToken)

  res.status(HTTP_STATUS.OK).json({ message: USERS_MESSAGE.SIGNED_NEW_TOKEN_SUCCESS, newAccessToken })
}

export const logoutController = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken
  if (!token) return res.status(HTTP_STATUS.OK).json({ message: USERS_MESSAGE.LOGOUT_SUCCESS })
  await authService.logoutService(token)
  clearRefreshCookie(res)
  res.status(HTTP_STATUS.OK).json({ message: USERS_MESSAGE.LOGOUT_SUCCESS })
}

export const registerController = async (req: Request, res: Response) => {
  // matchedData chỉ lấy những field đã được validate.
  // Nó lấy tất cả các nơi mà express-validator validate, gồm:
  // req.body
  // req.query
  // req.params
  // req.headers
  // req.cookies
  // Nếu chỉ muốn lấy body?
  // const payload = matchedData(req, { locations: ['body'] })
  const payload = matchedData<RegisterPayload>(req)
  const { accessToken, refreshToken } = await authService.registerService(payload)
  //lưu cookie
  setRefreshCookie(res, refreshToken)
  res.status(HTTP_STATUS.CREATED).json({ message: USERS_MESSAGE.REGISTER_SUCCESS, accessToken })
}

export const googleLoginController = async (req: Request, res: Response) => {
  const { id_token } = req.body
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: process.env.GOOGLE_CLIENT_ID
  })

  if (!ticket) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGE.GOOGLE_AUTHENTICATION_FAILED,
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }

  const payload = ticket.getPayload()
  if (!payload?.email_verified) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGE.GOOGLE_EMAIL_NOT_VERIFIED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  }
  //check issuer: Token này thật sự được phát hành bởi Google, Chứ không phải bởi một server giả mạo
  if (payload?.iss !== 'accounts.google.com' && payload?.iss !== 'https://accounts.google.com') {
    throw new ErrorWithStatus({
      message: USERS_MESSAGE.INVALID_GOOGLE_TOKEN_ISSUER,
      status: HTTP_STATUS.BAD_REQUEST
    })
  }
  // matchedData() chỉ nhận Express Request object, không nhận một object bình thường.
  const { sub, email, name } = payload!
  // 1. Check user trong DB
  const emailCheck = await authService.checkEmailService(email as string)

  if (!emailCheck) {
    //nghĩa là chưa đký tk ở web này
    const { accessToken, refreshToken } = await authService.googleRegisterService({
      googleId: sub,
      email: email as string,
      name: name as string,
      yob: new Date().getFullYear(),
      gender: false
    })
    setRefreshCookie(res, refreshToken)
    return res.json({
      accessToken,
      refreshToken
    })
  }
  const { accessToken, refreshToken } = await authService.loginGoogleService(email as string, sub)
  setRefreshCookie(res, refreshToken)
  res.status(HTTP_STATUS.OK).json({ message: USERS_MESSAGE.LOGIN_SUCCESS, accessToken })
}
