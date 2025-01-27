import express, { Express } from 'express'
import chatRouter from '@/routes/ChatRoute'

const app: Express = express()

app.use(express.json())

app.use('/chats', chatRouter)

export default app
