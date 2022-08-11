import * as THREE from "three";
import Experience from "../Experience";
class Lights {
  constructor() {
    const experience = new Experience();

    const hemisphereLight = this.createHemisphereLight();
    const ambientLight = this.createAmbientLight();
    const pointLightFront = this.createPointLightFront();
    const pointLightBack = this.createPointLightBack();
    const directionalLightLeft = this.createDirectionalLightLeft();
    const directionalLightBack = this.createDirectionalLightBack();
    experience.scene.add(
      ambientLight,
      hemisphereLight,
      pointLightBack,
      directionalLightLeft,
      directionalLightBack,
      pointLightFront
    );
  }

  createAmbientLight = (): THREE.AmbientLight => {
    const light: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.1);
    return light;
  };

  createHemisphereLight = (): THREE.HemisphereLight => {
    const light: THREE.HemisphereLight = new THREE.HemisphereLight(
      13824255,
      13288633,
      2
    );
    light.position.set(0, 30.76964, 0);
    return light;
  };

  createPointLightFront = (): THREE.PointLight => {
    const light: THREE.PointLight = new THREE.PointLight(16777215, 24, 0, 1);
    light.position.set(12.825554, 16.340102, 10.718796);
    return light;
  };

  createPointLightBack = (): THREE.PointLight => {
    const light: THREE.PointLight = new THREE.PointLight(16777215, 30, 0, 1);
    light.position.set(0.223137, 10.075519, -20.203);
    return light;
  };

  createDirectionalLightLeft = (): THREE.DirectionalLight => {
    const light: THREE.DirectionalLight = new THREE.DirectionalLight(
      16777215,
      3
    );
    light.position.set(-25.132806, 11.739785, 28.437942);
    return light;
  };

  createDirectionalLightBack = (): THREE.DirectionalLight => {
    const light: THREE.DirectionalLight = new THREE.DirectionalLight(
      16777215,
      2
    );
    light.position.set(-19.027508, 13.855078, -14.548573);
    return light;
  };
}

export default Lights;
