import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums.js'

export interface TokenPayload extends JwtPayload {
  userId: string
  tokenType: TokenType
  jti?: string
}
