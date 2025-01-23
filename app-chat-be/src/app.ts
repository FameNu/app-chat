import express, { Express, Request, Response } from 'express'
import { Chat } from './model/Chat'

const app: Express = express()

app.use(express.json())

const chats: Chat[] = [
  { username: 'Alice', message: 'Hello' },
  { username: 'Bob', message: 'Hi' },
]

app.get('/', (req: Request, res: Response) => {
  res.json(chats)
})

export default app
