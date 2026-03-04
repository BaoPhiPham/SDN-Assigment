import { Router } from 'express'
import {
    
  googleLoginController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController
} from '~/controllers/auth.controllers.js'
import { googleLoginValidation, loginValidation, registerValidation } from '~/validators/auth.validators.js'
import { wrapRequestHandler } from '~/utils/handleFunction.js'
import { refreshTokenValidation } from '~/middlewares/auth.middlewares.js'

const authRouter = Router()
authRouter.post('/login',  loginValidation, wrapRequestHandler(loginController))
authRouter.post('/register',  registerValidation, wrapRequestHandler(registerController))
authRouter.post(
  '/refresh-token',
  wrapRequestHandler(refreshTokenValidation),
  wrapRequestHandler(refreshTokenController)
)
authRouter.post('/logout', wrapRequestHandler(logoutController))
authRouter.post('/google',
  googleLoginValidation,
  wrapRequestHandler(googleLoginController))

export default authRouter
