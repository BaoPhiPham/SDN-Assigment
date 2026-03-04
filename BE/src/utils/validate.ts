import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema.js'
import HTTP_STATUS from '~/constants/httpStatus.js'
import { EntityError, ErrorWithStatus } from '~/models/error.model.js'

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //chạy xong sẽ đưa lỗi schema vào request
    for (const validation of validations) {
      await validation.run(req)
    }
    //ko lỗi thì next, tiếp tục request:
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    //có lỗi thì map từ array về object
    const errorsObject = errors.mapped() //ép về object
    const entityError = new EntityError({ error: {} })
    //vì checkSchema có bắt luôn các lỗi đặt biệt luôn
    for (const key in errorsObject) {
      const { msg } = errorsObject[key] //rã message trong từng key
      //trả về lỗi ko phải validate
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
        //ko phải là lỗi validate thì return về error handler
        // vì ta ưu tiên in các lỗi ko phải validation(422) trc cho client
      }
      //vượt qua if => là các lỗi validation 422:
      entityError.error[key] = errorsObject[key]
    }
    //
    next(entityError) //những lỗi validation cx về middleware error handler
  }
}
