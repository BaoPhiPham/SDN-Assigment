import { model } from 'mongoose'
import perfumeSchema from '../schemas/perfume.schema.js'
import { IPerfume } from '~/types/models/perfume.type.js'

export default model<IPerfume>('Perfume', perfumeSchema, 'perfumes')
