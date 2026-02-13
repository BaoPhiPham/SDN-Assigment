import { Request, Response } from 'express'
import rateLimit from 'express-rate-limit'

// 1. Login Rate Limiter - Chống brute force
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit: 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers

  // Skip successful requests (optional)
  skipSuccessfulRequests: false,

  // Skip failed requests (optional)
  skipFailedRequests: false,

  // Custom key generator (default: IP address)
  keyGenerator: (req) => {
    return req.ip || 'unknown'
  },

  // Custom handler when limit exceeded
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many login attempts, please try again later',
      retryAfter: req.rateLimit?.resetTime
    })
  }
})

// 2. Register Rate Limiter - Chống spam account creation
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit: 3 registrations per hour per IP
  message: {
    success: false,
    message: 'Too many accounts created from this IP, please try again after an hour'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// 3. General API Rate Limiter - Bảo vệ tất cả endpoints
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit: 100 requests per 15 minutes
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// 4. Password Reset Rate Limiter
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit: 3 password reset requests per hour
  message: {
    success: false,
    message: 'Too many password reset attempts, please try again after an hour'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// 5. Comment/Review Rate Limiter - Chống spam
export const commentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit: 5 comments per minute
  message: {
    success: false,
    message: 'You are posting comments too quickly, please slow down'
  },
  standardHeaders: true,
  legacyHeaders: false
})
