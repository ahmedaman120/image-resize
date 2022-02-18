import { Image } from '../router/helpers/Image.class'
import fs from 'fs'
import path from 'path'
import I_image from '../router/interfaces/I_image'

const testImagesNamesExist: string[] = ['test', 'test-2'] //these are images alerdy existing
const testImagesNamesNotExist: string[] = ['test-3', 'test2'] //these are mages not existing
const PUBLIC_PATH: string = path.join(__dirname, '../../public')
const OUTPUT_PATH: string = path.join(PUBLIC_PATH, 'out')
const type = 'png'

const test_width = 100
const test_height = 100

beforeAll( (done) => {
  console.log(OUTPUT_PATH)
  fs.rmSync(OUTPUT_PATH + '/', { recursive: true });
  fs.mkdirSync(OUTPUT_PATH)
  done()
})

afterAll((done) => {
  fs.rmSync(OUTPUT_PATH + '/', { recursive: true });
  fs.mkdirSync(OUTPUT_PATH)
  done()
})

describe('Test image Class components', () => {


  it('test create thumbnail', async () => {
    const img: I_image = {
      In_path: Image.IN_PATH as unknown as string,
      width: test_width,
      height: test_height,
      name: `${testImagesNamesExist[0]}.${type}`,
    }
    try {
      const imageResized: I_image | null = await Image.createThumpnails(img);
      expect(imageResized?.name).toEqual('thumb-test-100-100.png')
    } catch (error) {
      console.log(error)
    }
  })

  it('test create thumbnail by using unexisten image',async () => {
    const img: I_image = {
      In_path: Image.IN_PATH as unknown as string,
      width: test_width,
      height: test_height,
      name: `${testImagesNamesNotExist[0]}.${type}`,
    }
    try {
      const imageResized: I_image | null = await Image.createThumpnails(img);
      expect(imageResized).toEqual(null)
    } catch (error) {
      console.log(error)
    }
  })
  it('test get image path', () => {
    const image = Image.createImageName(
      testImagesNamesExist[1],
      test_width,
      test_height
    )
    expect(image.startsWith('thumb')).toBeTruthy()
  })
})
