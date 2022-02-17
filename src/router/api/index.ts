/* eslint-disable prettier/prettier */
import express from 'express'
import { Image } from '../helpers/Image.class'
import I_image from '../interfaces/I_image'
import ImageValidator from '../middlewares/ImageValidator'
const router = express.Router()

const MAIN_IMAGE_EXTENTION = 'png'

router.get('/image',ImageValidator.validateImageParm, async (req, res) => {
  const MAIN_IMAGE_DIR = '../../public/images/'
  try {
    const nameOfImage: string = req.query.name as unknown as string
    const width: string = req.query.width as unknown as string
    const height: string = req.query.height as unknown as string
   

    const img: I_image = {
      In_path: Image.IN_PATH as unknown as string,
      width: width,
      height: height,
      name: `${nameOfImage}.${MAIN_IMAGE_EXTENTION}`,
    }
    const ret: null | string = await Image.resize(img)
    console.log(ret)
    await (await Image.getAllImages()).forEach((value)=>{console.log(value)})
    res.send('now we can work well')
  } catch (error) {
    console.log(error)
  }
})

export default router
