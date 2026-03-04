import HTTP_STATUS from '~/constants/httpStatus.js'
import { COMMENTS_MESSAGE, PERFUMES_MESSAGE } from '~/constants/messages.js'
import { ErrorWithStatus } from '~/models/error.model.js'
import { Comment, Perfume } from '~/models/index.js'
import { CreateCommentPayload, UpdateCommentPayload } from '~/types/requests/requestPayload.js'

class CommentService {
  async createComment(payload: CreateCommentPayload, userId: string) {
    const { perfumeId, content, rating } = payload
    //tìm perfume:
    const perfume = await Perfume.findById(perfumeId)
    if (!perfume) {
      throw new ErrorWithStatus({
        message: PERFUMES_MESSAGE.PERFUME_NOT_FOUND, //
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
    //comment once:
    const exists = await Comment.exists({
      perfume: perfumeId,
      author: userId
    })
    if (exists) {
      throw new ErrorWithStatus({
        message: COMMENTS_MESSAGE.COMMENT_ALREADY_EXISTS, //
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
    //create comment:
    const comment = await Comment.create({
      perfume: perfumeId, // các method của model trong mongoose sẽ tự cast sang ObjectID
      author: userId,
      content,
      rating
    })

    await Perfume.findByIdAndUpdate(perfumeId, {
      $push: { comments: comment._id }
    })
    return comment
  }
  async getAllComment(perfumeId: string) {
    const result = await Comment.find({ perfume: perfumeId }).populate({
      path: 'author',
      select: 'name'
    })
    return result
  }
  async deleteComment(id: string, userId: string) {
    const filter = {
      _id: id,
      author: userId
    }
    const deleteComment = await Comment.findOneAndDelete(filter)
    if (!deleteComment) {
      throw new ErrorWithStatus({
        message: COMMENTS_MESSAGE.DELETE_COMMENT_FAIL, //
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    await Perfume.findByIdAndUpdate(deleteComment.perfume, {
      $pull: { comments: deleteComment._id }
    })

    return deleteComment
  }
  async updateComment(id: string, userId: string, payload: UpdateCommentPayload) {
    const filter = {
      _id: id,
      author: userId
    }
    const updateComment = await Comment.findOneAndUpdate(
      filter,
      {
        ...payload
      },
      {
        new: true
      }
    ).populate({
      path: 'author',
      select: 'name'
    })
    if (!updateComment) {
      throw new ErrorWithStatus({
        message: COMMENTS_MESSAGE.UPDATE_COMMENT_FAIL, //
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    return updateComment
  }
}

const commentService = new CommentService()
export default commentService
