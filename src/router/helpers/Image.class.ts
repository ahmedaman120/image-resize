import I_image from '../interfaces/I_image'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export class Image {
  static OUT_PATH = path.join(__dirname, '../../../public/out/').toString()
  static IN_PATH = path.join(__dirname, '../../../public/images/').toString()

  static createImageName(
    name: string | undefined,
    width: number,
    height: number
  ): string {
    const imgName = `thumb-${name?.split('.')[0]}-${width}-${height}.png`
    return imgName
  }

  static async resize(image: I_image): Promise<null | I_image> {
    try {
      const imgName = Image.createImageName(
        image.name,
        image.width as number,
        image.height as number
      )
      const out: string = path.join(Image.OUT_PATH, imgName).toString()
      const targetImage = path.join(
        image.In_path as string,
        image.name as string
      );
      await sharp(targetImage as string)
        .resize(
          parseInt(image.width as string),
          parseInt(image.height as string)
        )
        .toFile(out)
      image.name = imgName
      image.Out_path = Image.OUT_PATH
      return image
    } catch (error) {
      return null
    }
  }

  static async isImageExist(filename = ''): Promise<boolean> {
    if (!filename) {
      return false // Fail early
    }

    return (await Image.getAllImages()).includes(filename)
  }

  static async getAllImages(): Promise<string[]> {
    try {
      return await fs.promises.readdir(Image.OUT_PATH)
    } catch {
      return []
    }
  }

  static async createThumpnails(image: I_image): Promise<I_image | null> {
    try {
      //check if image exist or not
      const name: string = Image.createImageName(
        image.name,
        image.width as number,
        image.height as number
      )
      if (await Image.isImageExist(name)) {
        image.name = name
        image.Out_path = Image.OUT_PATH
        return image
      } else {
        const resized_image: I_image | null = await Image.resize(image)
        return resized_image
      }
    } catch (error) {
      return null
    }
  }
}
