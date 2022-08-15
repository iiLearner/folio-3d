import * as THREE from "three";
import { htmlToDomElement } from "../dom";
import Sizes from "../utils/Sizes";
import template from "./../assets/modal/instructions.html";
import Camera from "./camera";
import Canvas from "./canvas";
import Experience from "./Experience";
export default class Renderer {
  instance: THREE.WebGLRenderer;
  experience: Experience;
  canvas: Canvas;
  sizes: Sizes;
  scene: THREE.Scene;
  camera: Camera;

  constructor() {
    this.experience = new Experience();
    const app = htmlToDomElement(template);
    this.experience.container.appendChild(app);

    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setrenderer();
  }

  setrenderer() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas.instance,
      antialias: true,
    });
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
