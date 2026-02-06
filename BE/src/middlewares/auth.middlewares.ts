import { checkSchema, ParamSchema } from 'express-validator'
import { USERS_MESSAGE } from '~/constants/messages.js'
import { validate } from '~/utils/validate.js'

const nameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGE.NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGE.NAME_MUST_BE_A_STRING
  },
  trim: true, //lọc bỏ khoảng trắng đầu và cuối
  isLength: {
    errorMessage: USERS_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
    options: {
      min: 3,
      max: 100
    }
  }
}

const emailSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGE.EMAIL_IS_REQUIRED
  },
  isEmail: {
    errorMessage: USERS_MESSAGE.EMAIL_IS_INVALID
  },
  normalizeEmail: true //chuyển thành chữ thường và loại bỏ khoảng trắng
}

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

const confirmPasswordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    errorMessage: USERS_MESSAGE.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50,
    options: {
      min: 6,
      max: 50
    }
  },
  custom: {
    options: (value, { req }) => value === req.body.password,
    errorMessage: USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD
  }
}

const yobSchema: ParamSchema = {
  optional: true, // Vì schema không required
  isInt: {
    options: { min: 1900, max: new Date().getFullYear() },
    errorMessage: USERS_MESSAGE.DATE_OF_BIRTH_MUST_BE_NUMBER
  }
}

const genderSchema: ParamSchema = {
  optional: true, // Vì schema không required
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
