import { checkSchema, ParamSchema } from 'express-validator'
import { USERS_MESSAGE } from '~/constants/messages.js'
import { validate } from '~/utils/validate.js'
import { confirmPasswordSchema, emailSchema, nameSchema } from './common.validators.js'

const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGE.PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGE.PASSWORD_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    errorMessage: USERS_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50,
    options: {
      min: 6,
      max: 50
    }
  }
}

const yobSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGE.DATE_OF_BIRTH_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: USERS_MESSAGE.DATE_OF_BIRTH_MUST_BE_NUMBER
  }
}

const genderSchema: ParamSchema = {
  isBoolean: {
    errorMessage: USERS_MESSAGE.GENDER_MUST_BE_A_BOOLEAN
  },
  notEmpty: {
    errorMessage: USERS_MESSAGE.GENDER_MUST_BE_REQUIRED
  }
}

export const registerValidation = validate(
  checkSchema(
    {
      name: nameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirm_password: confirmPasswordSchema,
      gender: genderSchema,
      yob: yobSchema
    },
    ['body']
  )
)
export const loginValidation = validate(
  checkSchema(
    {
      email: emailSchema,
      password: passwordSchema
    },
    ['body']
  )
)

export const accessTokenValidation = validate(
  checkSchema(
    {
      authorization: {
        notEmpty: {
          errorMessage: USERS_MESSAGE.ACCESS_TOKEN_IS_REQUIRED
        },
        custom: {
          options: (value) => {
            if (!value.startsWith('Bearer ')) {
              throw new Error(USERS_MESSAGE.ACCESS_TOKEN_IS_REQUIRED)
            }
            return true
          }
        }
      }
    },
    ['headers']
  )
)
