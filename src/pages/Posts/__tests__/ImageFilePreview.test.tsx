import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageFilePreview from "../forms/ImageFilePreview";
import * as ImageFilePreviewModule from "../../../pages/Posts/forms/ImageFilePreview";

describe("ImageFilePreview", () => {
  describe("getHTMLImageElement", () => {
    let file: File;

    beforeAll(() => {
      global.URL.createObjectURL = jest.fn(() => "url");
    });
    beforeEach(() => {
      file = new File([new ArrayBuffer(1)], "image.png");
    });
    it("returns HTMLImageElement", () => {
      const element = ImageFilePreviewModule.getHTMLImageElementFromFile(file);
      expect(element instanceof HTMLImageElement).toEqual(true);
    });
    it("sets image src attribute", () => {
      const element = ImageFilePreviewModule.getHTMLImageElementFromFile(file);
      expect(element.src).toBeTruthy();
    });
  });

  describe("resizeImageToWidth", () => {
    it("resizes image to specified width while maintaining aspect ratio", () => {
      const width = 100;
      let img = new Image();
      img.width = 1000;
      img.height = 8000;
      img = ImageFilePreviewModule.resizeImageToWidth(img, width);
      expect(img.width).toEqual(100);
      expect(img.height).toEqual(800);
    });
  });

  describe("resizeImageToHeight", () => {
    it("resizes image to specified height while maintaining aspect ratio", () => {
      const height = 100;
      let img = new Image();
      img.height = 1000;
      img.width = 8000;
      img = ImageFilePreviewModule.resizeImageToHeight(img, height);
      expect(img.height).toEqual(100);
      expect(img.width).toEqual(800);
    });
  });

  describe("resizeImage", () => {
    it("resizes image to fit within canvas area", () => {
      let img = new Image();
      img.height = 200;
      img.width = 300;
      img = ImageFilePreviewModule.resizeImage(img, 150, 100);
      expect(img.width).toEqual(150);
      expect(img.height).toEqual(100);
    });
  });

  describe("degreesToRadians", () => {
    it("returns degrees converted to radians", () => {
      const degrees = 10;
      const radians = ImageFilePreviewModule.degreesToRadians(degrees);
      expect(radians).toEqual((Math.PI / 180) * degrees);
    });
  });

  describe("clearCanvas", () => {
    let ctx: any;

    beforeEach(() => {
      ctx = {
        clearRect: jest.fn(),
        canvas: { width: 10, height: 15 },
      };
    });

    it("clears the canvas only once", () => {
      ImageFilePreviewModule.clearCanvas(ctx);
      expect(ctx.clearRect).toBeCalledTimes(1);
    });

    it("clears the entire canvas area", () => {
      ImageFilePreviewModule.clearCanvas(ctx);
      expect(ctx.clearRect).toHaveBeenCalledWith(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
    });
  });

  describe("restoreAndClearCanvas", () => {
    let ctx: any;
    let mockCalls: any[];

    beforeEach(() => {
      mockCalls = [];
      ctx = {
        restore: jest.fn(() => mockCalls.push("restore")),
        clearRect: jest.fn(() => mockCalls.push("clear")),
        canvas: {},
      };
    });

    it("restores the canvas once", () => {
      ImageFilePreviewModule.restoreAndClearCanvas(ctx);
      expect(ctx.restore).toBeCalledTimes(1);
    });

    it("clears the canvas once", () => {
      ImageFilePreviewModule.restoreAndClearCanvas(ctx);
      expect(ctx.clearRect).toBeCalledTimes(1);
    });

    it("restores and clears in the correct order", () => {
      ImageFilePreviewModule.restoreAndClearCanvas(ctx);
      expect(mockCalls[0]).toEqual("restore");
      expect(mockCalls[1]).toEqual("clear");
    });
  });

  describe("rotateCanvas", () => {
    let ctx: any;
    let mockCalls: any[];
    const deg = 90;
    const radians = (Math.PI / 180) * deg;

    beforeEach(() => {
      ctx = {
        canvas: {
          width: 20,
          height: 20,
        },
        translate: jest.fn(() => {
          mockCalls.push("translate");
        }),
        rotate: jest.fn(() => {
          mockCalls.push("rotate");
        }),
        save: jest.fn(),
      };
      mockCalls = [];
    });

    it("translates canvas origin to center", () => {
      ImageFilePreviewModule.rotateCanvas(ctx, deg);
      expect(ctx.translate.mock.calls[0][0]).toEqual(ctx.canvas.width / 2);
      expect(ctx.translate.mock.calls[0][1]).toEqual(ctx.canvas.height / 2);
    });

    it("rotates canvas using radians from degrees", () => {
      ImageFilePreviewModule.rotateCanvas(ctx, deg);
      expect(ctx.rotate).toBeCalledTimes(1);
      expect(ctx.rotate).toBeCalledWith(radians);
    });

    it("reverses previous translation", () => {
      ImageFilePreviewModule.rotateCanvas(ctx, deg);
      expect(-ctx.translate.mock.calls[1][0]).toEqual(ctx.canvas.width / 2);
      expect(-ctx.translate.mock.calls[1][1]).toEqual(ctx.canvas.height / 2);
    });

    it("translates, rotates, and reverses translation in the correct order", () => {
      ImageFilePreviewModule.rotateCanvas(ctx, deg);
      expect(mockCalls[0]).toEqual("translate");
      expect(mockCalls[1]).toEqual("rotate");
      expect(mockCalls[2]).toEqual("translate");
    });
  });

  describe("drawCenteredImage", () => {
    const ctx: any = {
      drawImage: jest.fn(),
      canvas: {
        width: 100,
        height: 100,
      },
    };

    it("drawn image is centered", () => {
      const img = new Image();
      img.width = 100;
      img.height = 100;
      const x = ctx.canvas.width / 2 - img.width / 2;
      const y = ctx.canvas.height / 2 - img.height / 2;
      ImageFilePreviewModule.drawCenteredImage(ctx, img);
      expect(ctx.drawImage).toBeCalledTimes(1);
      expect(ctx.drawImage).toBeCalledWith(img, x, y, img.width, img.height);
    });
  });

  describe("ImageFilePreview", () => {
    it("renders canvas element", () => {
      render(
        <ImageFilePreview maxWidth={300} maxHeight={300} onSave={() => {}} />
      );
      const canvas = screen.getByText("Image Preview");
      expect(canvas).toBeInTheDocument();
      expect(canvas instanceof HTMLCanvasElement).toEqual(true);
    });
    it("renders rotate buttons", () => {
      render(
        <ImageFilePreview maxWidth={300} maxHeight={300} onSave={() => {}} />
      );
      const rotateRight = screen.getByText("Rotate Right");
      const rotateLeft = screen.getByText("Rotate Left");
      expect(rotateRight).toBeInTheDocument();
      expect(rotateRight instanceof HTMLButtonElement).toEqual(true);
      expect(rotateLeft).toBeInTheDocument();
      expect(rotateLeft instanceof HTMLButtonElement).toEqual(true);
    });

    it("renders save button", async () => {
      const onSave = jest.fn();
      render(
        <ImageFilePreview maxWidth={300} maxHeight={300} onSave={onSave} />
      );
      const button = screen.getByText("Save");
      expect(button).toBeInTheDocument();
    });
  });
});
