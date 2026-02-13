import { model } from 'mongoose'
import memberSchema from '../schemas/member.schema.js'
import { IMember } from '~/types/models/member.type.js'

export default model<IMember>('Member', memberSchema, 'members')
