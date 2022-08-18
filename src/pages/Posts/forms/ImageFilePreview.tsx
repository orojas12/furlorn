import { useRef, useState, useEffect } from "react";
import "./ImageFilePreview.scss";

export function getHTMLImageElementFromFile(file: File) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  return img;
}

/**
 * Resizes image to the specified width while maintaining aspect ratio.
 */
export function resizeImageToWidth(img: HTMLImageElement, width: number) {
  const scale = width / img.width;
  const height = scale * img.height;
  img.width = width;
  img.height = height;
  return img;
}

/**
 * Resizes image to the specified height while maintaining aspect ratio.
 */
export function resizeImageToHeight(img: HTMLImageElement, height: number) {
  const scale = height / img.height;
  const width = scale * img.width;
  img.width = width;
  img.height = height;
  return img;
}

export function degreesToRadians(deg: number) {
  return (Math.PI / 180) * deg;
}

export function clearCanvas(ctx: CanvasRenderingContext2D) {
  if (!ctx) return console.error("No canvas context found.");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function restoreAndClearCanvas(ctx: CanvasRenderingContext2D) {
  if (!ctx) return console.error("No canvas context found.");
  ctx.restore();
  clearCanvas(ctx);
}

export function rotateCanvas(ctx: CanvasRenderingContext2D, deg: number) {
  if (!ctx) return console.error("No canvas context found.");
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.rotate(degreesToRadians(deg));
  ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
}

export function drawCenteredImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement
) {
  const x = ctx.canvas.width / 2 - img.width / 2;
  const y = ctx.canvas.height / 2 - img.height / 2;
  ctx.drawImage(img, x, y, img.width, img.height);
}

export function resizeImage(
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
) {
  img = resizeImageToWidth(img, maxWidth);
  if (img.height > maxHeight) {
    img = resizeImageToHeight(img, maxHeight);
  }
  return img;
}

export interface IImageFilePreviewProps {
  file?: File | null;
  maxWidth: number;
  maxHeight: number;
  onSave: (blob: Blob | null) => void;
}

export default function ImageFilePreview(props: IImageFilePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  // On mount, create and save canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas)
      return console.error("No ref attribute found on canvas element.");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.globalCompositeOperation = "copy";
    ctxRef.current = ctx;
    ctx.save();
  }, []);

  // Create image element from file.
  // When loaded, resize and set state.
  useEffect(() => {
    if (props.file) {
      let img = getHTMLImageElementFromFile(props.file);
      img.addEventListener("load", () => {
        resizeImage(img, props.maxWidth, props.maxHeight);
        setImage(img);
      });
    } else {
      setImage(null);
    }
  }, [props.file, props.maxWidth, props.maxHeight]);

  // On image change, draw to canvas.
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    restoreAndClearCanvas(ctx);
    if (image) {
      drawCenteredImage(ctx, image);
    }
    ctx.save();
  }, [image]);

  return (
    <div className="ImageFilePreview">
      <canvas
        ref={canvasRef}
        id="MyCanvas"
        width={props.maxWidth}
        height={props.maxHeight}
        style={{ backgroundColor: "lightgray" }}
      >
        Image Preview
      </canvas>
      <div className="ImageFilePreview__controls">
        <button
          type="button"
          onClick={() => {
            const ctx = ctxRef.current;
            if (ctx && image) {
              rotateCanvas(ctx, -90);
              drawCenteredImage(ctx, image);
            }
          }}
        >
          Rotate Left
        </button>
        <button
          type="button"
          onClick={() => {
            const canvas = canvasRef.current;
            const ctx = ctxRef.current;
            if (canvas && ctx && image) {
              canvas.toBlob((blob) => {
                if (!blob) return console.error("Failed to create blob.");
                const file = new File([blob], "photo.jpg", {
                  type: "image/jpeg",
                });
                props.onSave(file);
              }, "image/jpeg");
            }
          }}
        >
          Save
        </button>
        <button
          className="ImageFilePreview__rotate"
          type="button"
          onClick={() => {
            const ctx = ctxRef.current;
            if (ctx && image) {
              rotateCanvas(ctx, 90);
              drawCenteredImage(ctx, image);
            }
          }}
        >
          Rotate Right
        </button>
      </div>
    </div>
  );
}
