import I_image from '../interfaces/I_image'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export class Image {
  static OUT_PATH = path.join(__dirname, '../../public/out/').toString()
  static IN_PATH = path.join(__dirname, '../../public/images/').toString()

  static async resize(image: I_image): Promise<null | I_image> {
    try {
      const imgName = `thump-${image.name}.png`
      const out: string = path.join(Image.OUT_PATH, imgName).toString()
      const targetImage = path.join(image.In_path, image.name)
      await sharp(targetImage as unknown as string)
        .resize(+image.width, +image.height)
        .toFile(out)
      image.name = imgName
      image.Out_path = Image.OUT_PATH
      return image
    } catch (error) {
      console.error(error)
      return null
    }
  }

  static async getImage(img: I_image): Promise<null | string> {
    if (!img.name) {
      return null
    }
    const filePath: string = path.resolve(Image.OUT_PATH, img.name)
    try {
      await fs.promises.access(filePath)
      return filePath
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
      return await fs.promises.readdir(Image.IN_PATH)
    } catch {
      return []
    }
  }
}
