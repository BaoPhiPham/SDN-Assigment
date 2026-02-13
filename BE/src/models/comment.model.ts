import { model } from 'mongoose'
import commentSchema from '../schemas/comment.schema.js'
import { IComment } from '~/types/models/comment.type.js'

export default model<IComment>('Comment', commentSchema, 'comments')
