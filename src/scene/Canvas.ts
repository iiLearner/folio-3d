import Experience from "./Experience";

class Canvas {
  instance: HTMLCanvasElement;
  constructor() {
    const experience = new Experience();
    const canvasElement = experience.container.querySelector(
      "canvas.viewer"
    ) as HTMLCanvasElement;

    this.instance = canvasElement;
    this.instance.style.cursor = "grab";
    this.instance.style.outline = "none";

    this.instance.addEventListener("pointerdown", () => {
      this.instance.style.cursor = "grabbing";
    });

    this.instance.addEventListener("pointerup", () => {
      this.instance.style.cursor = "grab";
    });
  }
}

export default Canvas;
