import { config } from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import { connectDB } from './config/database.js'
import { redisClient } from './config/redis.js'
import { errorHandler } from './middlewares/error.middleware.js'

config()
const POST = process.env.PORT || 5000
const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())

//connectDB
await connectDB()
//redis:
await redisClient.connect()

//routes:
app.use('/api/v1/auth', authRouter)
app.use('/', () => {
  console.log('Hello World')
})

//error handler
app.use(errorHandler)

app.listen(POST, () => {
  console.log(`Server is running on port ${POST}`)
})
