import { NextFunction, Request, Response } from 'express'
import { TokenType } from '~/constants/enums.js'
import { USERS_MESSAGE } from '~/constants/messages.js'
import memberServices from '~/services/member.services.js'
import { verifyToken } from '~/utils/jwt.js'

export const verifyAccessToken = async (
  req: Request, //
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  const decoded = await verifyToken({ token: token!, secretKey: process.env.JWT_SECRET as string })
  if (decoded.tokenType !== TokenType.AccessToken) {
    throw new Error(USERS_MESSAGE.ACCESS_TOKEN_IS_INVALID)
  }
  req.userDecoded = decoded
  next()
}

export const checkUserExists = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userDecoded.userId
  const user = await memberServices.getMemberById(userId)
  req.user = user
  next()
}
export const refreshTokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.refreshToken

  if (!token) {
    throw new Error(USERS_MESSAGE.REFRESH_TOKEN_IS_INVALID)
  }

  req.refreshToken = token
  next()
}
