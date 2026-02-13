import { COMMENTS_MESSAGE, PERFUMES_MESSAGE } from '~/constants/messages.js'
import { Comment, Perfume } from '~/models/index.js'
import { CreateCommentPayload, UpdateCommentPayload } from '~/types/requests/requestPayload.js'

class CommentService {
  async createComment(payload: CreateCommentPayload) {
    const { perfumeId, author, content, rating } = payload
    //tìm perfume:
    const perfume = await Perfume.findById(perfumeId)
    if (!perfume) {
      throw new Error(PERFUMES_MESSAGE.PERFUME_NOT_FOUND)
    }
    //comment once:
    const exists = await Comment.exists({
      perfume: perfumeId,
      author: author
    })
    if (exists) {
      throw new Error(COMMENTS_MESSAGE.COMMENT_ALREADY_EXISTS)
    }
    //create comment:
    const comment = await Comment.create({
      perfume: perfumeId, // các method của model trong mongoose sẽ tự cast sang ObjectID
      author,
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
    const deleteComment = await Comment.findByIdAndDelete(filter)
    if (!deleteComment) {
      throw new Error(COMMENTS_MESSAGE.DELETE_COMMENT_FAIL)
    }
    return deleteComment
  }
  async updateComment(id: string, userId: string, payload: UpdateCommentPayload) {
    const filter = {
      _id: id,
      author: userId
    }
    const updateComment = await Comment.findByIdAndUpdate(
      filter,
      {
        ...payload
      },
      {
        new: true
      }
    ).populate({
      path: 'author',
      select: 'name avatar _id'
    })
    if (!updateComment) {
      throw new Error(COMMENTS_MESSAGE.UPDATE_COMMENT_FAIL)
    }
    return updateComment
  }
}

const commentService = new CommentService()
export default commentService
