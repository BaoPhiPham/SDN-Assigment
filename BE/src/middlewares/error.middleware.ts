import { NextFunction, Request, Response } from 'express'
import { Result, ValidationError } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus.js'

export const errorHandler = async (
  err: Error | Result<ValidationError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Kiểm tra nếu là validation error từ express-validator
  if (typeof (err as Result<ValidationError>).array === 'function') {
    const validationErrors = (err as Result<ValidationError>).array()
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Validation error',
      errors: validationErrors
    })
  }

  // Error thông thường
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message })
}
