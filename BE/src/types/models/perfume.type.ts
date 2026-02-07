import { Types } from 'mongoose'

export interface IPerfume {
  _id: Types.ObjectId
  perfumeName: string
  uri: string
  price: number
  concentration: string
  description: string
  ingredients: string
  volume: number
  targetAudience: string
  brand: Types.ObjectId
}
