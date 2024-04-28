import { CanvasPoolCreate, CanvasPoolCreateReturn } from './types'

let zIndex: number = 1
export class CanvasPool {
  create({ width = 1, height = 1, refComponent, alpha = true }: CanvasPoolCreate): CanvasPoolCreateReturn {
    let canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.style.position = 'absolute'
    canvas.style.zIndex = String(zIndex)

    zIndex++

    const ctx = canvas.getContext('2d', { alpha }) as CanvasRenderingContext2D

    const container = refComponent || document.body

    container.appendChild(canvas)

    return {
      canvas,
      ctx
    }
  }
}
