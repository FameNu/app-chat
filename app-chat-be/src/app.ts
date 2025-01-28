import express, { Express } from 'express'
import cors from 'cors'
import chatRouter from '@/routes/ChatRoute'

const BASE_URL: string | undefined = process.env.BASE_URL

const app: Express = express()

const crossOriginOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    const allowedOrigins = ['http://localhost:5173']
    if (BASE_URL) allowedOrigins.push(BASE_URL)

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true) // for allowed origins
    } else {
      callback(new Error('Not allowed by CORS')) // for not allowed origins
    }
  },
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies or credentials
  optionsSuccessStatus: 200, // Status for preflight requests (default is 204)
  // allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}

app.use(cors(crossOriginOptions))

app.use(express.json())

app.use('/chats', chatRouter)

export default app
