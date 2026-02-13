import { TokenPayload } from './jwt.type'
import { IMember } from './types/models/member.type.ts'

declare global {
  namespace Express {
    interface Request {
      userDecoded?: TokenPayload
      user?: IMember
      refreshToken?: string
      rateLimit
    }
  }
}
