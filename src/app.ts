import express from 'express'
import cookieParser from 'cookie-parser'
import routes from './router/api'
// import morgan from 'morgan'
import path from 'path'
import fs from 'fs'
import { Image } from './router/helpers/Image.class'

const app = express()
app.use(cookieParser())
// app.use(morgan('combined'))
app.use('/static', express.static(path.join(__dirname, '../public')))
const port = 3000

app.use('/api', routes)
app.listen(port,async () => {
  // console.log('hello to server form ts')
  if (await fs.existsSync(Image.OUT_PATH)){
    return 0;
  }
  fs.mkdirSync(Image.OUT_PATH)
  return 1
})

export default app
