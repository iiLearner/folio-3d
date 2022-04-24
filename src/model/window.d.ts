import * as THREE from "three";
import { FutureFashion } from "../index";

declare global {
  interface Window {
    scene: THREE.Object3D;
    futureFashion: FutureFashion;
    THREE: THREE;
  }
}
