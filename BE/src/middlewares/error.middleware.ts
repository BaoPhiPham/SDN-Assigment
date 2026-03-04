import { NextFunction, Request, Response } from 'express'
import { Result, ValidationError } from 'express-validator'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus.js'
import { ErrorWithStatus } from '~/models/error.model.js'

export const errorHandler = async (
  err: Error | Result<ValidationError> | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorWithStatus) {
    //ko cần xét EntityError vì EntityError extends ErrorWithStatus
    return res.status(err.status).json(omit(err, 'status'))
  }
  //các lỗi đặc biệt khác
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  // console.log('Lỗi đặc biệt nè')
  res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR) //
    .json({
      message: err.message,
      errorInfor: omit(err, 'stack')
    })
}
