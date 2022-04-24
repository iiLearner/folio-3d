import * as THREE from "three";
import { addDynamicShadow } from "./createDynamicShadow";

export const addShadow = async (
  scene: THREE.Scene,
  object: any,
) => {
  addDynamicShadow(scene, object)
};
