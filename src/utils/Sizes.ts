import * as THREE from "three";
import Experience from "../scene/Experience";
import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  width: number;
  height: number;
  pixelRatio: number;
  mouse: THREE.Vector2;

  constructor() {
    super();

    const experience = new Experience();

    const { width, height } = experience.container.getBoundingClientRect();

    // Setup
    this.width = width;
    this.height = height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.mouse = new THREE.Vector2();

    // Resize event
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.trigger("resize");
    });

    // Mouse event
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / experience.sizes.width) * 2 - 1;
      this.mouse.y = -(event.clientY / experience.sizes.height) * 2 + 1;

      this.trigger("mousemove");
    });
  }
}
