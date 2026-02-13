import { NextFunction, Request, Response } from 'express'
import { USERS_MESSAGE } from '~/constants/messages.js'

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.userDecoded) {
    throw new Error(USERS_MESSAGE.ACCESS_TOKEN_IS_INVALID)
  }
  if (!req.userDecoded.isAdmin) {
    throw new Error(USERS_MESSAGE.YOU_ARE_NOT_ADMIN)
  }
  next()
}
export const isMemberMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.userDecoded) {
    throw new Error(USERS_MESSAGE.ACCESS_TOKEN_IS_INVALID)
  }
  if (req.userDecoded.isAdmin) {
    throw new Error(USERS_MESSAGE.YOU_ARE_NOT_MEMBER)
  }
  next()
}
