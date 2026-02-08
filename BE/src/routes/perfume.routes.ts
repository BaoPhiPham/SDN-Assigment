import { Router } from 'express'
import {
  createPerfumeController,
  deletePerfumeController,
  getAllPerfumesController,
  getPerfumeByIdController,
  searchPerfumeController,
  updatePerfumeController
} from '~/controllers/perfume.controllers.js'
import { verifyAccessToken } from '~/middlewares/auth.middlewares.js'
import { isAdminMiddleware } from '~/middlewares/role.middlewares.js'
import { wrapRequestHandler } from '~/utils/handleFunction.js'
import { accessTokenValidation } from '~/validators/auth.validators.js'
import { createPerfumeValidation, updatePerfumeValidation } from '~/validators/perfume.validators.js'

const perfumeRouter = Router()

//public route:
perfumeRouter.get('/', wrapRequestHandler(getAllPerfumesController))
//public Static route (/search) phải đứng trước dynamic route (/:id)
perfumeRouter.get('/search', wrapRequestHandler(searchPerfumeController))
perfumeRouter.get('/:id', wrapRequestHandler(getPerfumeByIdController))

//private route:
perfumeRouter.post(
  '/',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isAdminMiddleware),
  createPerfumeValidation,
  wrapRequestHandler(createPerfumeController)
)
perfumeRouter.put(
  '/:id',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isAdminMiddleware),
  updatePerfumeValidation,
  wrapRequestHandler(updatePerfumeController)
)
perfumeRouter.delete(
  '/:id',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isAdminMiddleware),
  wrapRequestHandler(deletePerfumeController)
)

export default perfumeRouter
