import * as THREE from "three";
import { traverse } from "../../utils/utils";

export class ViewerEnvironment {
  private _intensity: number = 2;
  private envMapEquirectTexture: THREE.Texture | null = null;
  private refObjects: THREE.Object3D[] = [];

  public get intensity(): number {
    return this._intensity;
  }
  public set intensity(v: number) {
    this._intensity = v;
    this.updateObjects();
  }

  constructor(
    protected readonly renderer: THREE.WebGLRenderer,
  ) {
  }

  async init() {
    if (!!this.envMapEquirectTexture) {
      throw new Error("ViewerEnvironment init just call");
    }

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    const envMapTexture = new THREE.Texture();
    this.envMapEquirectTexture = pmremGenerator.fromEquirectangular(
      envMapTexture
    ).texture;
  }

  add(): THREE.Texture {
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 2;
    return this.envMapEquirectTexture!;
  }

  addObject(obj: THREE.Object3D): void {
    this.setEnv(obj);
    this.refObjects.push(obj);
  }

  private updateObjects() {
    this.refObjects.forEach((obj) => this.setEnv(obj));
  }

  private setEnv(object: THREE.Object3D): void {
    traverse(object, (obj) => {
      if (
        obj instanceof THREE.Mesh &&
        obj.material instanceof THREE.MeshStandardMaterial
      ) {
        obj.material.envMap = this.envMapEquirectTexture;
        obj.material.envMapIntensity = this.intensity;
        obj.material.needsUpdate = true;
      }
    });
  }
}

export default async (
  renderer: THREE.WebGLRenderer,
): Promise<ViewerEnvironment> => {
  const viewerEnvironment = new ViewerEnvironment(renderer);
  await viewerEnvironment.init();
  return viewerEnvironment;
};
