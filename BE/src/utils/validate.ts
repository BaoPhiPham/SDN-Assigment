import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema.js'

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
    //
    next(errors) //những lỗi validation cx về middleware error handler
  }
}
