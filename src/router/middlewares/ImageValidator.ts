import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export default {
  validateImageParm(req: Request, res: Response, next: Function) {
    if (!req.query.name) {
      return res
        .status(400)
        .send('Not found the image please check the image list')
    }

    if (req.query.width && parseFloat(req.query.width) <= 0) {
      return res
        .status(400)
        .send(
          `Please enter "width" value like this :e.g 200 not like that:e.g ${req.query.width}`
        )
    }

    if (req.query.height && parseFloat(req.query.height) <= 0) {
      return res
        .status(400)
        .send(
          `Please enter "height" value like this :e.g 200 not like that:e.g ${req.query.height}`
        )
    }
    const nameOfImage: string = req.query.name as unknown as string
    const MAIN_IMAGE_DIR = '../../../public/images/'
    const MAIN_IMAGE_EXTENTION = 'png'

    if (
      !fs.existsSync(
        path.join(
          __dirname,
          MAIN_IMAGE_DIR,
          `${nameOfImage}.${MAIN_IMAGE_EXTENTION}`
        )
      )
    ) {
      // check the file not exist in our collection
      return res
        .status(400)
        .send('Not found the image please check the image on our list');
    }
    next()
  },
}
