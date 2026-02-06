import { redisClient } from '../config/redis.js'

export const saveRefreshToken = async ({ jti, userId }: { jti: string; userId: string }) => {
  const ttl = Number(process.env.REDIS_EXPIRES_IN || 60 * 60 * 24 * 7)
  await redisClient.set(`refresh:${jti}`, userId, { EX: ttl })
}

export const deleteRefreshToken = async (jti: string) => {
  await redisClient.del(`refresh:${jti}`)
}

export const existsRefreshToken = async (jti: string) => {
  return redisClient.exists(`refresh:${jti}`)
}

export const getUserIdFromRedis = async (jti: string) => {
  return redisClient.get(`refresh:${jti}`)
}
