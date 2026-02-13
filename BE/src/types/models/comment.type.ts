import { Types } from 'mongoose'

export interface IComment {
  _id?: Types.ObjectId
  author: Types.ObjectId
  content: string
  rating: number
  perfume: Types.ObjectId
}
