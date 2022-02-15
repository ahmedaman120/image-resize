import express from 'express'
import cookieParser from 'cookie-parser'
import { promises as fs } from 'fs'
import routes from './router/api'

const app = express()
app.use(cookieParser())
app.use('/api', routes)
const port = 3000

const writeData = async (URL: string) => {
  try{
      const openFile = await fs.open('./build/utilities/db/test.txt','a+')
      await openFile.write(URL)
  }catch(err){
      console.log(err)
  }
}


app.get('/books', async (req, res) => {
  // console.log(req.query)
  // console.log(req.cookies)
  // console.log(req.ip)
  // console.log(req.subdomains)
  await writeData(Date.now().toString())
  res.send('success').status(200)
})

app.get('/divid', (req, res) => {
  const { num1, num2 } = req.query
  if ((num2 as unknown as number) == 0) {
    res.send('Error ').status(400)
  }
  const number1 = num1 as unknown as number
  const number2 = num2 as unknown as number
  const result = number1 / number2
  // console.log(result)
  res.json({ result: result }).status(200)
})
app.listen(port, () => {
  // console.log('hello to server form ts')
  return 0
})

export default app
