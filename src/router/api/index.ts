/* eslint-disable prettier/prettier */
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/image', async (req, res) => {
  const MAIN_IMAGE_DIR = '../../utilities/images/';
  try {
    const nameOfImage: string = req.query.name as unknown as string;
    const width: string = req.query.width as unknown as string;
    const height: string = req.query.height as unknown as string;
    if (!fs.existsSync(path.join(__dirname,MAIN_IMAGE_DIR, nameOfImage))) {
      // check the file not exist in our collection
      return res.status(400).send('Check your inputs well');
    }
    if (isNaN(+width) || isNaN(+height)) {
      // check the input width and height is'n numbers
      return res.status(400).send('Check your inputs well');
    }

    res.send("now we can work well");
  } catch (error) {
    console.log(error);
  }
});

export default router;
