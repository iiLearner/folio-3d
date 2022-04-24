import * as THREE from "three";

class Canvas {

  instance: HTMLCanvasElement;
  constructor(renderer: THREE.WebGLRenderer) {
    this.instance = renderer.domElement
    this.instance.style.cursor = 'grab'
    this.instance.style.outline = 'none'

    this.instance.addEventListener('pointerdown', () => {
      this.instance.style.cursor = 'grabbing'
    })

    this.instance.addEventListener('pointerup', () => {
      this.instance.style.cursor = 'grab'
    })
  }
};

export default Canvas
