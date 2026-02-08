import { validate } from '~/utils/validate.js'
import { checkSchema, ParamSchema } from 'express-validator'
import { PERFUMES_MESSAGE } from '~/constants/messages.js'

const perfumeNameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PERFUMES_MESSAGE.PERFUME_NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: PERFUMES_MESSAGE.PERFUME_NAME_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    errorMessage: PERFUMES_MESSAGE.PERFUME_NAME_LENGTH_MUST_BE_FROM_1_TO_100,
    options: {
      min: 3,
      max: 50
    }
  }
}
const brandSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PERFUMES_MESSAGE.BRAND_IS_REQUIRED
  },
  trim: true
}

const descriptionSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PERFUMES_MESSAGE.DESCRIPTION_IS_REQUIRED
  },
  isString: {
    errorMessage: PERFUMES_MESSAGE.DESCRIPTION_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    errorMessage: PERFUMES_MESSAGE.DESCRIPTION_LENGTH_MUST_BE_FROM_10_TO_500,
    options: {
      min: 10,
      max: 500
    }
  }
}

const uriSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PERFUMES_MESSAGE.IMAGE_URL_IS_REQUIRED
  },
  isString: {
    errorMessage: PERFUMES_MESSAGE.IMAGE_URL_MUST_BE_A_STRING
  }
}

const priceSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PERFUMES_MESSAGE.PRICE_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: PERFUMES_MESSAGE.PRICE_MUST_BE_A_NUMBER
  },
  isInt: {
    errorMessage: PERFUMES_MESSAGE.PRICE_MUST_BE_FROM_0_TO_1000000,
    options: {
      min: 0,
      max: 1000000
    }
  }
}

const concentrationSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PERFUMES_MESSAGE.CONCENTRATION_IS_REQUIRED
  },
  isString: {
    errorMessage: PERFUMES_MESSAGE.CONCENTRATION_MUST_BE_A_STRING
  }
}

const ingredientsSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PERFUMES_MESSAGE.INGREDIENTS_IS_REQUIRED
  },
  isString: {
    errorMessage: PERFUMES_MESSAGE.INGREDIENTS_MUST_BE_A_STRING
  }
}

const volumeSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PERFUMES_MESSAGE.VOLUME_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: PERFUMES_MESSAGE.VOLUME_MUST_BE_A_NUMBER
  },
  isInt: {
    errorMessage: PERFUMES_MESSAGE.VOLUME_MUST_BE_FROM_0_TO_1000000,
    options: {
      min: 0,
      max: 1000000
    }
  }
}
const targetAudienceSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PERFUMES_MESSAGE.TARGET_AUDIENCE_IS_REQUIRED
  },
  isString: {
    errorMessage: PERFUMES_MESSAGE.TARGET_AUDIENCE_MUST_BE_A_STRING
  },
  trim: true
}

export const createPerfumeValidation = validate(
  checkSchema({
    perfumeName: perfumeNameSchema,
    brand: brandSchema,
    description: descriptionSchema,
    uri: uriSchema,
    price: priceSchema,
    concentration: concentrationSchema,
    ingredients: ingredientsSchema,
    volume: volumeSchema,
    targetAudience: targetAudienceSchema
  })
)

export const updatePerfumeValidation = validate(
  checkSchema({
    perfumeName: { ...perfumeNameSchema, optional: true },
    brand: { ...brandSchema, optional: true },
    description: { ...descriptionSchema, optional: true },
    uri: { ...uriSchema, optional: true },
    price: { ...priceSchema, optional: true },
    concentration: { ...concentrationSchema, optional: true },
    ingredients: { ...ingredientsSchema, optional: true },
    volume: { ...volumeSchema, optional: true },
    targetAudience: { ...targetAudienceSchema, optional: true }
  })
)
