import { Router } from 'express'
import { getAllCollectorsController } from '~/controllers/collector.controllers.js'
import { verifyAccessToken } from '~/middlewares/auth.middlewares.js'
import { isAdminMiddleware } from '~/middlewares/role.middlewares.js'
import { wrapRequestHandler } from '~/utils/handleFunction.js'
import { accessTokenValidation } from '~/validators/auth.validators.js'

const collectorRouter = Router()

collectorRouter.get(
  '/',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken), //
  wrapRequestHandler(isAdminMiddleware),
  wrapRequestHandler(getAllCollectorsController)
)

export default collectorRouter
