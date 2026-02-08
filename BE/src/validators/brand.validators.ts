import { checkSchema, ParamSchema } from 'express-validator'
import { BRANDS_MESSAGE } from '~/constants/messages.js'
import { validate } from '~/utils/validate.js'

const brandNameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: BRANDS_MESSAGE.BRAND_NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: BRANDS_MESSAGE.BRAND_NAME_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: BRANDS_MESSAGE.BRAND_NAME_LENGTH_MUST_BE_FROM_1_TO_100
  }
}

export const createBrandValidation = validate(
  checkSchema({
    brandName: brandNameSchema
  })
)

export const updateBrandValidation = validate(
  checkSchema({
    brandName: brandNameSchema
  })
)
