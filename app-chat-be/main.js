const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const chats = [
  { username: 'Alice', message: 'Hello' },
  { username: 'Bob', message: 'Hi' },
]

app.get('/', (req, res) => {
  res.json(chats)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
