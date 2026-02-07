import jwt, { SignOptions } from 'jsonwebtoken'
import { config } from 'dotenv'
import { TokenPayload } from '~/types/jwt/jwt.js'
// import { TokenPayload } from '~/models/requests/users.requests'

config()
export const signToken = ({
  payload,
  privateKey, //
  options = {
    algorithm: 'HS256' // quy định mặc định luôn thuật toán
  }
}: {
  payload: TokenPayload
  privateKey: string //ko nên cho mặc định do ta ký dùng các key khác nhau
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      //Nếu token ko phỉa string thì sẽ có lỗi trong error
      if (error) {
        return reject(error)
      }
      return resolve(token as string)
    })
  })
}

// Verify – Quá trình xác thực dữ liệu đã được mã hóa (encoded)
export const verifyToken = ({ token, secretKey }: { token: string; secretKey: string }) => {
  //giải mã token jwt ta chỉ cần lấy đc payload để biết userId(hoặc role luôn)
  //jwt.JwtPayload ta sửa lại kiểu này của jwt để thêm 1 vài trường
  //      giúp chuẩn hóa cho server (user_id và token type)
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        throw reject(error)
      }
      resolve(decoded as TokenPayload)
    })
  })
}
