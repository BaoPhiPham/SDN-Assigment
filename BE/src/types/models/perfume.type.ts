import { Types } from 'mongoose'

export interface IPerfume {
  _id?: Types.ObjectId
  perfumeName: string
  uri: string
  price: number
  concentration: string
  comments: Types.ObjectId[]
  description: string
  ingredients: string
  volume: number
  targetAudience: string
  brand: Types.ObjectId
}
