import { model } from 'mongoose'
import brandSchema from './schemas/brand.schema.js'

export default model('Brand', brandSchema, 'brands')
