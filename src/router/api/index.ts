/* eslint-disable prettier/prettier */
import express from 'express';
import fs from 'fs';
import path from 'path';
import { Image } from '../helpers/Image.class';
import I_image from '../interfaces/I_image';

const router = express.Router();

const MAIN_IMAGE_EXTENTION = 'png';


router.get('/image', async (req, res) => {
 
  const MAIN_IMAGE_DIR = '../../public/images/';
  try {
    const nameOfImage: string = req.query.name as unknown as string;
    const width: string = req.query.width as unknown as string;
    const height: string = req.query.height as unknown as string;
    if (!fs.existsSync(path.join(__dirname,MAIN_IMAGE_DIR, `${nameOfImage}.${MAIN_IMAGE_EXTENTION}`))) {
      // check the file not exist in our collection
      return res.status(400).send('Check your inputs well');
    }
    if (isNaN(+width) || isNaN(+height)) {
      // check the input width and height is'n numbers
      return res.status(400).send('Check your inputs well');
    }
    
    const img: I_image = {
        In_path: (Image.IN_PATH as unknown) as string,
        width: width,
        height: height,
        name:`${nameOfImage}.${MAIN_IMAGE_EXTENTION}`
    };
    const ret: null | string = await Image.resize(img);
    console.log(ret);
    res.send("now we can work well");
  } catch (error) {
    console.log(error);
  }
});

export default router;
