const express = require('express')
const app = express()
import { Request, Response } from 'express'
const PORT = process.env.PORT || 3000

app.use(express.json())

interface Chat {
  username: string
  message: string
}

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
