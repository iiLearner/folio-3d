import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Experience from "./Experience";

class Controls {
  instance: OrbitControls

  constructor() {
    const experience = new Experience()

    this.instance = new OrbitControls(experience.camera.instance, experience.canvas.instance)
    this.instance.enabled = true
    this.instance.autoRotate = true
    this.instance.enableDamping = true
  }

  update() {
    this.instance.update()
  }
};

export default Controls;
