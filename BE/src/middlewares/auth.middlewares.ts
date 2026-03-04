import { NextFunction, Request, Response } from 'express'
import { TokenType } from '~/constants/enums.js'
import HTTP_STATUS from '~/constants/httpStatus.js'
import { USERS_MESSAGE } from '~/constants/messages.js'
import { ErrorWithStatus } from '~/models/error.model.js'
import memberServices from '~/services/member.services.js'
import { verifyToken } from '~/utils/jwt.js'

export const verifyAccessToken = async (
  req: Request, //
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (!token)
    throw new ErrorWithStatus({
      message: USERS_MESSAGE.ACCESS_TOKEN_IS_REQUIRED, //
      status: HTTP_STATUS.UNAUTHORIZED
    })
  const decoded = await verifyToken({ token: token, secretKey: process.env.JWT_SECRET as string })
  if (decoded.tokenType !== TokenType.AccessToken) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGE.ACCESS_TOKEN_IS_INVALID, //
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }
  req.userDecoded = decoded
  next()
}

export const checkUserExists = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userDecoded?.userId as string
  const user = await memberServices.getMemberById(userId)
  if (!user) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGE.USER_NOT_FOUND, //
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }
  req.user = user
  next()
}
export const refreshTokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.refreshToken
  if (!token) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGE.REFRESH_TOKEN_IS_REQUIRED, //
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }
  req.refreshToken = token
  next()
}
