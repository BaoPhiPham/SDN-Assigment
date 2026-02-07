import { Schema } from 'mongoose'

const brandSchema = new Schema({ brandName: String }, { timestamps: true })

export default brandSchema
