import { Schema } from 'mongoose'

const memberSchema = new Schema(
  {
    googleId: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
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
    },
    is_deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)
export default memberSchema
