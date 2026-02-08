import { checkSchema, ParamSchema } from 'express-validator'
import { USERS_MESSAGE } from '~/constants/messages.js'
import { validate } from '~/utils/validate.js'

const nameSchema: ParamSchema = {
  optional: true,
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

const oldPasswordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGE.OLD_PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGE.OLD_PASSWORD_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    errorMessage: USERS_MESSAGE.OLD_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50,
    options: {
      min: 6,
      max: 50
    }
  }
}

const newPasswordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGE.NEW_PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGE.NEW_PASSWORD_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    errorMessage: USERS_MESSAGE.NEW_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50,
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
    options: (value, { req }) => {
      if (!req.body?.password) {
        throw new Error(USERS_MESSAGE.PASSWORD_IS_REQUIRED)
      }
      return value === req.body.password
    },
    errorMessage: USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD
  }
}

const yobSchema: ParamSchema = {
  optional: true,

  isNumeric: {
    errorMessage: USERS_MESSAGE.DATE_OF_BIRTH_MUST_BE_NUMBER
  }
}

const genderSchema: ParamSchema = {
  isBoolean: {
    errorMessage: USERS_MESSAGE.GENDER_MUST_BE_A_BOOLEAN
  },
  optional: true
}

export const updateProfileValidation = validate(
  checkSchema(
    {
      name: nameSchema,
      gender: genderSchema,
      yob: yobSchema
    },
    ['body']
  )
)

export const changePasswordValidation = validate(
  checkSchema(
    {
      old_password: oldPasswordSchema,
      password: newPasswordSchema,
      confirm_password: confirmPasswordSchema
    },
    ['body']
  )
)
