import { Image } from '../router/helpers/Image.class'
import fs from 'fs'
import path from 'path'

const testImagesNamesExist: string[] = ['test', 'test-2'] //these are images alerdy existing
const testImagesNamesNotExist: string[] = ['test-3', 'test2'] //these are mages not existing
const PUBLIC_PATH: string = path.join(__dirname, '../../public')
const INPUT_PATH: string = path.join(PUBLIC_PATH, 'images')
const OUTPUT_PATH: string = path.join(PUBLIC_PATH, 'out')

const test_width = 100
const test_height = 100

beforeAll((done) => {
  console.log(OUTPUT_PATH)
  fs.promises.rmdir(OUTPUT_PATH, { recursive: true })
  done()
})

afterAll((done) => {
  fs.promises.rmdir(OUTPUT_PATH, { recursive: true })
  done()
})

describe('Test image Class components', () => {
 
  it('test get image path', () => {
    const image = Image.createImageName(
      testImagesNamesExist[0],
      test_width,
      test_height
    )
    expect(image.startsWith('thumb')).toBeFalsy()
  })
})
