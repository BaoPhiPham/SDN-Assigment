import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema(
  {
    rating: { type: Number, min: 1, max: 3, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member', //ref đến model, ko ref đến schema
      required: true
    },
    perfume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Perfume',
      required: true,
      index: true
    }
  },
  { timestamps: true }
)
commentSchema.index({ perfume: 1, author: 1 }, { unique: true })

export default commentSchema
