import { NextFunction, Request, Response } from 'express'
import { TokenType } from '~/constants/enums.js'
import { USERS_MESSAGE } from '~/constants/messages.js'
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
