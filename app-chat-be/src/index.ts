import  express, { Request, Response } from 'express'
import { Chat } from './model/Chat'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const chats: Chat[] = [
  { username: 'Alice', message: 'Hello' },
  { username: 'Bob', message: 'Hi' },
]

app.get('/', (req: Request, res: Response) => {
  res.json(chats)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
