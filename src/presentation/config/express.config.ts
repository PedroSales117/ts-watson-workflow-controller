import { PORT } from './index'
import express from 'express'
import cors from 'cors'

export const app = express()

app.listen(PORT, () => {
  console.log(`Listen on http://localhost:${PORT}`)
})

app.use(express.json())
app.use(express.static('public'))
app.use(cors())
