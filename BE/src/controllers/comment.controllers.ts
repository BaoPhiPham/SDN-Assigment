import { Request, Response } from 'express'
import { matchedData } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus.js'
import { COMMENTS_MESSAGE } from '~/constants/messages.js'
import commentService from '~/services/comment.services.js'
import { CreateCommentPayload, UpdateCommentPayload } from '~/types/requests/requestPayload.js'

export const createCommentController = async (req: Request, res: Response) => {
  const payload = matchedData<CreateCommentPayload>(req)
  const userId = req.userDecoded?.userId
  const result = await commentService.createComment(payload, userId as string)
  res.status(HTTP_STATUS.CREATED).json({ message: COMMENTS_MESSAGE.CREATE_COMMENT_SUCCESS, data: result })
}

export const getAllCommentController = async (req: Request, res: Response) => {
  const perfumeId = req.params.perfumeId
  const result = await commentService.getAllComment(perfumeId as string)
  res.status(HTTP_STATUS.OK).json({ message: COMMENTS_MESSAGE.GET_ALL_COMMENT_SUCCESS, data: result })
}

export const updateCommentController = async (req: Request, res: Response) => {
  const commentId = req.params.commentId
  const userId = req.userDecoded?.userId
  const payload = matchedData<UpdateCommentPayload>(req)
  const result = await commentService.updateComment(commentId as string, userId as string, payload)
  res.status(HTTP_STATUS.OK).json({ message: COMMENTS_MESSAGE.UPDATE_COMMENT_SUCCESS, data: result })
}
export const deleteCommentController = async (req: Request, res: Response) => {
  const commentId = req.params.commentId
  const userId = req.userDecoded?.userId
  const result = await commentService.deleteComment(commentId as string, userId as string)
  res.status(HTTP_STATUS.OK).json({ message: COMMENTS_MESSAGE.DELETE_COMMENT_SUCCESS, data: result })
}
