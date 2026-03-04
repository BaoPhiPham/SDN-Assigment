// hash.ts
import bcrypt from 'bcrypt'

const SALT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10 // có thể tăng lên 12 nếu muốn bảo mật cao hơn

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

// So sánh password khi login
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}
