import { Router } from 'express'
import { changePasswordController, updateProfileController } from '../controllers/member.controllers.js'
import { changePasswordValidation, updateProfileValidation } from '~/validators/member.validators.js'
import { wrapRequestHandler } from '~/utils/handleFunction.js'
import { accessTokenValidation } from '~/validators/auth.validators.js'
import { verifyAccessToken } from '~/middlewares/auth.middlewares.js'

const memberRouter = Router()

memberRouter.put(
  '/update-profile',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  updateProfileValidation,
  wrapRequestHandler(updateProfileController)
)
memberRouter.put(
  '/change-password',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  changePasswordValidation,
  wrapRequestHandler(changePasswordController)
)

export default memberRouter
