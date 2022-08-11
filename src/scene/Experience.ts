import * as THREE from "three";
import { loadModel } from "../assets";
import Sizes from "../utils/Sizes";
import Time from "../utils/Time";
import Camera from "./Camera";
import Canvas from "./canvas";
import Controls from "./controls";
import Lights from "./lights/Lights";
import RayCaster from "./Raycaster";
import Renderer from "./Renderer";

let instance: any = null;

class Experience {
  container: Element;
  scene: THREE.Scene;
  sizes: Sizes;
  camera: Camera;
  controls: Controls;
  canvas: Canvas;
  renderer: Renderer;
  time: Time;
  lights: Lights;
  raycaster: RayCaster;

  constructor(_container?: Element) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    this.container = _container!;
  }

  init() {
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.canvas = new Canvas();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.controls = new Controls();
    this.lights = new Lights();
    this.raycaster = new RayCaster();

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize(this.sizes);
    this.renderer.resize();
  }

  update() {
    this.controls.update();
    //this.world.update()
    this.renderer.update();
  }

  async initSetup() {
    const plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(14, 14),
      new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    plane.rotation.x += Math.PI / 2;
    plane.position.set(1.2, 12.9, -0.8);

    const grid = new THREE.GridHelper(100, 100);
    const axesHelper = new THREE.AxesHelper(1);

    this.scene.add(plane, grid, axesHelper);

    const room = await loadModel("./sources/porsch/scene.gltf");
    room.position.y += 1;

    //room.scale.normalize()
    this.scene.add(room);

    this.time.on("tick", () => {
      window.addEventListener("keydown", (e) => {
        if (e.key === "w") {
          room.position.z += 0.001;
        }
        if (e.key === "s") {
          room.position.z -= 0.001;
        }
        if (e.key === "a") {
          room.position.x += 0.1;
        }
        if (e.key === "d") {
          room.position.x -= 0.1;
        }
      });
    });
  }
}

export default Experience;
