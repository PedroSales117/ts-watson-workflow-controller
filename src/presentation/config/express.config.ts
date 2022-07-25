import express from 'express'

export const app = express()
export const router = express.Router()

app.use(express.json())
app.use(express.static('public'))
