import { Response } from 'express'

export const setRefreshCookie = (res: Response, token: string) => {
  const ttl = Number(process.env.COOKIE_EXPIRES_IN || 60 * 60 * 24 * 7)

  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ttl
  })
}

export const clearRefreshCookie = (res: Response) => {
  res.clearCookie('refreshToken')
}
