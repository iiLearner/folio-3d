import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


export const loadModel = (path: string): Promise<THREE.Group> =>
  new Promise<THREE.Group>((resolve) => {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(path, (gltf) => {
      const asset = gltf.scene
      resolve(asset)
    });
  });
