import { model } from 'mongoose'
import perfumeSchema from './schemas/perfume.schema.js'

export default model('Perfume', perfumeSchema, 'perfumes')
