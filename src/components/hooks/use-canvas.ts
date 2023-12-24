import { useEffect, useRef, useCallback, useState, MutableRefObject } from "react";

type ReturnUseCanvas = {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
};

const useCanvas = (drawGame: any): ReturnUseCanvas => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const contextRef = useRef<ContextType>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const width = useRef(window.innerWidth);
  const height = useRef(window.innerHeight);

  const drawCanvas = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawGame();
    },
    [drawGame]
  );

  useEffect(() => {
    let animationFrameId: any;

    if (canvasRef.current) {
      canvasRef.current.width = width.current;
      canvasRef.current.height = height.current;

      if (!canvas) {
        setCanvas(canvasRef.current);
      }

      if (!ctx) {
        setCtx(canvasRef.current.getContext("2d"));
      }

      if (ctx) {
        const render = () => {
          drawCanvas(ctx);
          animationFrameId = window.requestAnimationFrame(render);
        };
        render();
      }
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [canvas, ctx, drawCanvas]);

  return {
    ctx: ctx,
    canvas: canvas,
    canvasRef: canvasRef,
  };
};

export default useCanvas;
