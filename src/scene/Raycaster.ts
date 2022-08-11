import * as THREE from "three";
import EventEmitter from "../utils/EventEmitter";
import Experience from "./Experience";

export default class RayCaster extends EventEmitter {
  instance: THREE.Raycaster;
  experience: Experience;
  constructor() {
    super();

    this.experience = new Experience();

    // Setup
    this.instance = new THREE.Raycaster();
  }

  fromMouse(objects: THREE.Object3D[] | THREE.Group) {
    this.instance.setFromCamera(
      this.experience.sizes.mouse,
      this.experience.camera.instance
    );
    let intersects: THREE.Intersection[];
    if (objects instanceof THREE.Group) {
      intersects = this.instance.intersectObjects(objects.children, true);
    } else {
      intersects = this.instance.intersectObjects(objects);
    }
    return intersects;
  }
}
