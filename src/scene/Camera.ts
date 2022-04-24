import * as THREE from 'three';
import Sizes from '../utils/Sizes';
import Experience from './Experience';

export default class Camera {
  

  instance: THREE.PerspectiveCamera
  constructor() {
    const experience = new Experience()
    const sizes = experience.sizes
    const scene = experience.scene
    

    this.setInstance(scene, sizes)
  }

  setInstance(scene: THREE.Scene, sizes: Sizes) {
    this.instance = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
    this.instance.position.set(6, 4, 8)
    scene.add(this.instance)
  }

  resize(sizes: Sizes) {
    this.instance.aspect = sizes.width / sizes.height
    this.instance.updateProjectionMatrix()
  }

}
