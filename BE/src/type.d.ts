import { TokenPayload } from './types/jwt/jwt.js'
import { IMember } from './types/models/member.type.js'

declare global {
  namespace Express {
    interface Request {
      userDecoded?: TokenPayload
      user?: IMember
      refreshToken?: string
      rateLimit?: any
    }
  }
}
