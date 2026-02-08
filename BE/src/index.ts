import { config } from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import { connectDB } from './config/database.js'
import { redisClient } from './config/redis.js'
import { errorHandler } from './middlewares/error.middleware.js'
import perfumeRouter from './routes/perfume.routes.js'
import memberRouter from './routes/member.routes.js'
import brandRouter from './routes/brand.routes.js'

config()
const PORT = process.env.PORT || 5000
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
app.use('/api/v1/perfumes', perfumeRouter)
app.use('/api/v1/members', memberRouter)
app.use('/api/v1/brands', brandRouter)
app.use('/', () => {
  console.log('Hello World')
})

//error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
