import { checkSchema } from 'express-validator'
import { COMMENTS_MESSAGE } from '~/constants/messages.js'
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
      },
      perfumeId: {
        notEmpty: true,
        isString: true,
        trim: true
      },
      rating: {
        notEmpty: true,
        isInt: {
          options: { min: 1, max: 5 },
          errorMessage: COMMENTS_MESSAGE.RATING_MUST_BE_BETWEEN_1_AND_5
        }
      }
    },
    ['body']
  )
)

export const updateCommentValidation = validate(
  checkSchema(
    {
      content: {
        optional: true,
        isString: true,
        trim: true,
        isLength: {
          options: { min: 1, max: 500 }
        }
      },
      rating: {
        optional: true,
        isInt: {
          options: { min: 1, max: 5 },
          errorMessage: COMMENTS_MESSAGE.RATING_MUST_BE_BETWEEN_1_AND_5
        }
      }
    },
    ['body']
  )
)
