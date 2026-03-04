import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus.js'
import { USERS_MESSAGE } from '~/constants/messages.js'
import { ErrorWithStatus } from '~/models/error.model.js'

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.userDecoded) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGE.ACCESS_TOKEN_IS_INVALID, //
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }
  if (!req.userDecoded.isAdmin) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGE.YOU_ARE_NOT_ADMIN, //
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }
  next()
}
export const isMemberMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.userDecoded) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGE.ACCESS_TOKEN_IS_INVALID, //
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }
  if (req.userDecoded.isAdmin) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGE.ADMIN_CANNOT_PERFORM_THIS_ACTION, //
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }
  next()
}
