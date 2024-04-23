import { Draw, Engine } from '..'
import { CoreBaseWithoutMouse, CoreBaseConstructorType, PositionType } from '../types'

type SourceImageType = {
  x: number
  y: number
  width?: number
  height?: number
}

type SpriteConstructorType = CoreBaseConstructorType & {
  position: PositionType
  width?: number
  height?: number
  src: string
  sourceImage?: SourceImageType
  ImageClipComparator?: (img: any) => { sWidth: number; sHeight: number; dWidth: number; dHeight: number }
  ImageSourceComparator?: (img: any, curFrame?: number) => { sx: number; sy: number }
  animated?: boolean
  isCentered?: boolean
  maxFrames?: number
  frameHold?: number
}

export class Sprite extends CoreBaseWithoutMouse {
  position: PositionType = { x: 0, y: 0 }

  width: number | undefined = undefined
  height: number | undefined = undefined

  src = ''
  sourceImage?: SourceImageType = undefined

  currentFrame: number = 0
  maxFrames: number = 0

  animated: boolean = true
  isCentered: boolean = false

  ImageClipComparator?: (img: any) => { sWidth: number; sHeight: number; dWidth: number; dHeight: number } = undefined
  ImageSourceComparator?: (img: any) => { sx: number; sy: number } = undefined

  frameElapsed: number = 0
  frameHold: number = 10

  constructor({ position, height, width, src, sourceImage, ImageClipComparator, ImageSourceComparator, animated = true, isCentered = false, maxFrames, frameHold, ...args }: SpriteConstructorType) {
    super(args)
    this.position = position

    this.width = width
    this.height = height

    this.src = src

    this.sourceImage = sourceImage
    this.animated = animated
    this.isCentered = isCentered

    this.maxFrames = maxFrames || 0
    this.frameHold = frameHold || 10

    this.ImageClipComparator = ImageClipComparator

    if (animated) {
      this.ImageSourceComparator = ImageSourceComparator ? (img) => ImageSourceComparator(img, this.currentFrame) : undefined
    } else {
      this.ImageSourceComparator = ImageSourceComparator
    }
  }

  frameUpdater() {
    Engine.Helpers.delayToCallback('frameElapsed', 'frameHold', this, () => {
      if (this.currentFrame < this.maxFrames - 1) {
        this.currentFrame++
      } else {
        this.currentFrame = 0
      }
    })
  }

  draw() {
    // if (this.animated) {
    //   this.frameUpdater()
    // }

    Draw.Image({
      ctx: this.ctx,
      position: this.position,
      src: this.src,
      height: this.height,
      width: this.width,
      sourceImage: this.sourceImage,
      ImageClipComparator: this.ImageClipComparator,
      ImageSourceComparator: this.ImageSourceComparator,
      isCentered: this.isCentered
    })
  }
}
