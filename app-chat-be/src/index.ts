import app from "./app"

const BASE_URL: string = process.env.BASE_URL || 'http://localhost'
const PORT: string = process.env.PORT || '3000'

app.listen(PORT, () => {
  console.log(`Server is running on port ${BASE_URL}:${PORT}`)
})
