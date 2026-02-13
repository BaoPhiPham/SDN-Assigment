import { Router } from 'express'
import {
  createBrandController,
  deleteBrandController,
  getAllBrandsController,
  getBrandByIdController,
  updateBrandController
} from '~/controllers/brand.controllers.js'
import { verifyAccessToken } from '~/middlewares/auth.middlewares.js'
import { isAdminMiddleware } from '~/middlewares/role.middlewares.js'
import { wrapRequestHandler } from '~/utils/handleFunction.js'
import { accessTokenValidation } from '~/validators/auth.validators.js'
import { createBrandValidation, updateBrandValidation } from '~/validators/brand.validators.js'

const brandRouter = Router()

//public
brandRouter.get('/', wrapRequestHandler(getAllBrandsController))
//private route
brandRouter.get(
  '/:brandId',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isAdminMiddleware),
  wrapRequestHandler(getBrandByIdController)
)
brandRouter.post(
  '/',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isAdminMiddleware),
  createBrandValidation,
  wrapRequestHandler(createBrandController)
)
brandRouter.put(
  '/:brandId',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isAdminMiddleware),
  updateBrandValidation,
  wrapRequestHandler(updateBrandController)
)
brandRouter.delete(
  '/:brandId',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isAdminMiddleware),
  wrapRequestHandler(deleteBrandController)
)

export default brandRouter
