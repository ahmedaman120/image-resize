import express from 'express'
import cookieParser from 'cookie-parser'
import routes from './router/api'
// import morgan from 'morgan'
import path from 'path'

const app = express()
app.use(cookieParser())
// app.use(morgan('combined'))
app.use('/static', express.static(path.join(__dirname, '../public')))
const port = 3000

app.use('/api', routes)
app.listen(port, () => {
  // console.log('hello to server form ts')
  return 0
})

export default app
