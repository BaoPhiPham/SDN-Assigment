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
import { createCommentValidation, updateCommentValidation } from '~/validators/comment.validators.js'

const commentRouter = Router()
commentRouter.post(
  '/',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isMemberMiddleware),
  createCommentValidation,
  wrapRequestHandler(createCommentController)
)

commentRouter.get('/:perfumeId', wrapRequestHandler(getAllCommentController))

commentRouter.put(
  '/:commentId',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isMemberMiddleware),
  updateCommentValidation,
  wrapRequestHandler(updateCommentController)
)

commentRouter.delete(
  '/:commentId',
  accessTokenValidation,
  wrapRequestHandler(verifyAccessToken),
  wrapRequestHandler(isMemberMiddleware),
  wrapRequestHandler(deleteCommentController)
)

export default commentRouter
