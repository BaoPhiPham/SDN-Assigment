import { model } from 'mongoose'
import memberSchema from './schemas/member.schema.js'

export default model('Member', memberSchema, 'members')
