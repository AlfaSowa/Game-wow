import { useEffect, useRef, useCallback, useState } from "react";
import {
  CanvasType,
  ContextType,
  CoreOptionsWithNull,
} from "../../core/interfaces";

type ReturnUseCanvas = {
  canvasRef: any;
} & CoreOptionsWithNull;

const useCanvas = (drawGame: any): ReturnUseCanvas => {
  const canvasRef = useRef<CanvasType>(null);
  // const contextRef = useRef<ContextType>(null);
  const [canvas, setCanvas] = useState<CanvasType>(null);
  const [ctx, setCtx] = useState<ContextType>(null);

  const width = useRef(window.innerWidth);
  const height = useRef(window.innerHeight);

  const drawCanvas = useCallback(
    (ctx: any) => {
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
      } else {
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
