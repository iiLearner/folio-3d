import * as THREE from "three";
import Sizes from '../utils/Sizes';
import Camera from './Camera';
import Canvas from './canvas';
import Controls from "./controls";
import Renderer from './Renderer';

let instance: any  = null

class Experience {
  container: Element
  scene: THREE.Scene
  sizes: Sizes
  camera: Camera
  controls: Controls
  canvas: Canvas
  renderer: Renderer

  constructor(_container?: Element) {
    // Singleton
    if (instance) {
      return instance
    }
    instance = this

    this.container = _container!
    this.sizes = new Sizes(this.container)
    this.camera = new Camera()
    this.controls = new Controls()
    this.renderer = new Renderer()
    this.scene = new THREE.Scene()
    this.canvas = new Canvas(this.renderer.instance)
  }
}

export default Experience