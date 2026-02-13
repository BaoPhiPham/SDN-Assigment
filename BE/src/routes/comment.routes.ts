import { Router } from 'express'
import {
  createCommentController,
  deleteCommentController,
  getAllCommentController,
  updateCommentController
} from '~/controllers/comment.controllers.js'
import { verifyAccessToken } from '~/middlewares/auth.middlewares.js'
import { isMemberMiddleware } from '~/middlewares/role.middlewares.js'
import { wrapRequestHandler } from '~/utils/handleFunction.js'
import { accessTokenValidation } from '~/validators/auth.validators.js'
import { createCommentValidation } from '~/validators/comment.validators.js'

const commentRouter = Router()
commentRouter.post(
  '/',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isMemberMiddleware),
  createCommentValidation,
  wrapRequestHandler(createCommentController)
)

commentRouter.get(
  '/:perfumeId',
  accessTokenValidation, //
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(getAllCommentController)
)

commentRouter.put(
  '/:id',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isMemberMiddleware),
  wrapRequestHandler(updateCommentController)
)

commentRouter.delete(
  '/:id',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isMemberMiddleware),
  wrapRequestHandler(deleteCommentController)
)

export default commentRouter
