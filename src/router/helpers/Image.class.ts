import I_image from '../interfaces/I_image';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export class Image {

  static OUT_PATH = path.join(__dirname, '../../public/out/').toString();
  static IN_PATH = path.join(__dirname, '../../public/images/').toString();
  /**
   * 
   * @param image 
   * @returns image after resize
   * 
   * @description
   * steps 
   *    1-get file name and concat it with Unix time
   *    2-use sharp module to resize image
   *    3-override name with the new name 
   *    4-return image object
   */
  static async resize(image: I_image): Promise<null | I_image> {
    try {
      const imgName = `img-${Date.now()}.png`;
      const out: string = path.join(Image.OUT_PATH, imgName).toString();
      const targetImage = path.join(image.In_path, image.name);
      await sharp(targetImage as unknown as string)
        .resize(+image.width, +image.height)
        .toFile(out);
      image.name = imgName;
      image.Out_path = Image.OUT_PATH;
      return image;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
}
