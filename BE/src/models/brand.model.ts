import { model } from 'mongoose'
import brandSchema from '../schemas/brand.schema.js'
import { IBrand } from '~/types/models/brand.type.js'

export default model<IBrand>('Brand', brandSchema, 'brands')
