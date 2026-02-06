import { Request, Response } from 'express'
import { USERS_MESSAGE } from '~/constants/messages.js'
import authService from '~/services/auth.services.js'
import { clearRefreshCookie, setRefreshCookie } from './cookie.controller.js'
import { matchedData } from 'express-validator'
import { LoginPayload, RegisterPayload } from '~/types/requestPayload.js'

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginPayload
  const { accessToken, refreshToken } = await authService.loginService(email, password)

  setRefreshCookie(res, refreshToken)

  res.status(200).json({ message: USERS_MESSAGE.LOGIN_SUCCESS, accessToken })
}

export const refreshTokenController = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken
  if (!token)
    return res.status(401).json({
      message: USERS_MESSAGE.REFRESH_TOKEN_IS_INVALID
    })
  const { newAccesToken, newRefreshToken } = await authService.refreshTokenService(token)
  setRefreshCookie(res, newRefreshToken)

  res.status(200).json({ message: 'Signed new token is succesfully!!!', newAccesToken })
}

export const logoutController = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken
  if (!token) return res.status(200).json({ message: USERS_MESSAGE.LOGOUT_SUCCESS })
  await authService.logoutService(token)
  clearRefreshCookie(res)
  res.status(200).json({ message: USERS_MESSAGE.LOGOUT_SUCCESS })
}

export const registerController = async (req: Request, res: Response) => {
  const payload = matchedData(req) as RegisterPayload
  const { accessToken, refreshToken } = await authService.registerService(payload)
  //lưu cookie
  setRefreshCookie(res, refreshToken)
  res.status(201).json({ message: USERS_MESSAGE.REGISTER_SUCCESS, accessToken })
}
