import { Schema } from 'mongoose'

const brandSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true
    },

    is_deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export default brandSchema
