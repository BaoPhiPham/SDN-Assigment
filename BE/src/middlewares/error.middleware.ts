import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus.js'

export const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.log(err)
  res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message })
}
