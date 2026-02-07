import { Router } from 'express'
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController
} from '~/controllers/auth.controllers.js'
import { loginValidation, registerValidation } from '~/validators/auth.validators.js'
import { wrapRequestHandler } from '~/utils/handleFunction.js'

const authRouter = Router()
authRouter.post('/login', loginValidation, wrapRequestHandler(loginController))
authRouter.post('/register', registerValidation, wrapRequestHandler(registerController))
authRouter.post('/refresh-token', wrapRequestHandler(refreshTokenController))
authRouter.post('/logout', wrapRequestHandler(logoutController))

export default authRouter
