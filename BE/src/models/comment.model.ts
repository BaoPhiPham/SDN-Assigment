import { model } from 'mongoose'
import commentSchema from './schemas/comment.schema.js'

export default model('Comment', commentSchema, 'comments')
