import { Schema } from 'mongoose'

const memberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    yob: {
      type: Number,
      required: true
    },
    gender: {
      type: Boolean,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)
export default memberSchema
