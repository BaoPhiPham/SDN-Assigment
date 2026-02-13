import { Types } from 'mongoose'

export interface IMember {
  _id?: Types.ObjectId
  name: string
  email: string
  password: string
  yob: number
  gender: boolean
  isAdmin: boolean
}
