import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validate.js'

export const createCommentValidation = validate(
  checkSchema(
    {
      content: {
        notEmpty: true,
        isString: true,
        trim: true,
        isLength: {
          options: { min: 1, max: 500 }
        }
      }
    },
    ['body']
  )
)
