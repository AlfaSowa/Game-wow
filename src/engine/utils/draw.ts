import { PositionType } from '../types'

export const PI2: number = 2 * Math.PI

//--drawRectangle--//
export type DrawRectangleType = {
  ctx: CanvasRenderingContext2D
  position: PositionType
  width: number
  height: number
  color?: string
  fill?: boolean
}

export const drawRectangle = (args: DrawRectangleType) => {
  const { ctx, position, width, height, color, fill = true } = args

  if (ctx) {
    ctx.fillStyle = color || '#f5f7'
    ctx.strokeStyle = color || '#f5f7'
    ctx.beginPath()
    ctx.fillRect(position.x, position.y, width, height)
    if (fill) {
      ctx.fill()
    } else {
      ctx.stroke()
    }
  }
}

//--drawCircle--//
export type DrawCircleType = {
  ctx: CanvasRenderingContext2D
  position: PositionType
  radius: number
  color?: string
  fill?: boolean
}

export const drawCircle = (args: DrawCircleType) => {
  const { ctx, radius, position, color, fill = true } = args

  if (ctx) {
    ctx.fillStyle = color || '#f5f7'
    ctx.strokeStyle = color || '#f5f7'
    ctx.beginPath()
    ctx.arc(position.x, position.y, radius, 0, PI2)
    if (fill) {
      ctx.fill()
    } else {
      ctx.stroke()
    }
  }
}

//--drawImage--//
type SourceImageType = {
  x: number
  y: number
  width?: number
  height?: number
}

type DrawImageType = {
  ctx: CanvasRenderingContext2D
  position: PositionType
  src: string
  sourceImage?: SourceImageType
  width?: number
  height?: number
  ImageClipComparator?: (img: any) => { sWidth: number; sHeight: number; dWidth: number; dHeight: number }
  ImageSourceComparator?: (img: any) => { sx: number; sy: number }
  isCentered?: boolean
}

export const drawImage = (args: DrawImageType) => {
  const { ctx, position, src, sourceImage, width, height, ImageClipComparator, ImageSourceComparator, isCentered } = args

  const img = new Image()
  img.src = src

  const setImageClip = () => {
    return {
      sWidth: sourceImage?.width || width || img.width,
      sHeight: sourceImage?.height || height || img.height,
      dWidth: width || img.width,
      dHeight: height || img.height
    }
  }

  const setImageSource = () => {
    return {
      sx: sourceImage?.x || 0,
      sy: sourceImage?.y || 0
    }
  }

  const { sWidth, sHeight, dWidth, dHeight } = ImageClipComparator ? ImageClipComparator(img) : setImageClip()
  const { sx, sy } = ImageSourceComparator ? ImageSourceComparator(img) : setImageSource()

  if (ctx) {
    ctx.drawImage(img, sx, sy, sWidth, sHeight, isCentered ? position.x - dWidth / 2 : position.x, isCentered ? position.y - dHeight / 2 : position.y, dWidth, dHeight)
  }
}
