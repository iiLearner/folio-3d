import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { A, D, DIRECTIONS, KeyDisplay, S, W } from "./utils";

export class CharacterControls {
  model: THREE.Group;
  mixer: THREE.AnimationMixer;
  animationsMap: Map<string, THREE.AnimationAction> = new Map(); // Walk, Run, Idle
  orbitControl: OrbitControls;
  camera: THREE.Camera;

  // state
  currentAction: string;

  // temporary data
  walkDirection = new THREE.Vector3();
  rotateAngle = new THREE.Vector3(0, 1, 0);
  rotateQuarternion: THREE.Quaternion = new THREE.Quaternion();
  cameraTarget = new THREE.Vector3();

  // constants
  fadeDuration: number = 0.2;
  walkVelocity = 2;

  keysPressed: any = {};

  constructor(
    model: THREE.Group,
    mixer: THREE.AnimationMixer,
    animationsMap: Map<string, THREE.AnimationAction>,
    orbitControl: OrbitControls,
    camera: THREE.Camera,
    currentAction: string
  ) {
    this.model = model;
    this.mixer = mixer;
    this.animationsMap = animationsMap;
    this.currentAction = currentAction;
    this.animationsMap.forEach((value, key) => {
      if (key == currentAction) {
        value.play();
      }
    });
    this.orbitControl = orbitControl;
    this.camera = camera;
    this.updateCameraTarget(0, 0);
    this.registerKeys();
  }

  private registerKeys() {
    // CONTROL KEYS
    const keyDisplayQueue = new KeyDisplay();
    document.addEventListener(
      "keydown",
      (event) => {
        keyDisplayQueue.down(event.key);
        (this.keysPressed as any)[event.key.toLowerCase()] = true;
      },
      false
    );
    document.addEventListener(
      "keyup",
      (event) => {
        keyDisplayQueue.up(event.key);
        (this.keysPressed as any)[event.key.toLowerCase()] = false;
      },
      false
    );

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "w" }));
    setTimeout(() => {
      this.keysPressed["w"] = false;
      const instruction = document.getElementById(
        "instructions-container"
      ) as HTMLDivElement;
      instruction.classList.add("six");

      instruction.addEventListener("click", () => {
        instruction.classList.add("out");
        instruction.classList.remove("six");
      });
    }, 2000);
  }

  public update(delta: number) {
    const directionPressed = DIRECTIONS.some((key) => this.keysPressed[key]);

    let play = "";
    if (directionPressed) {
      play = "Walk";
    } else {
      play = "Idle";
    }

    if (this.currentAction != play) {
      const toPlay = this.animationsMap.get(play);
      const current = this.animationsMap.get(this.currentAction);
      if (current && toPlay) {
        current.fadeOut(this.fadeDuration);
        toPlay.reset().fadeIn(this.fadeDuration).play();
        this.currentAction = play;
      }
    }

    this.mixer.update(delta);

    if (this.currentAction == "Walk") {
      // calculate towards camera direction
      const angleYCameraDirection = Math.atan2(
        this.camera.position.x - this.model.position.x,
        this.camera.position.z - this.model.position.z
      );
      // diagonal movement angle offset
      const directionOffset = this.directionOffset(this.keysPressed);
      const directionCharacterOffset = this.directionCharacterOffset(
        this.keysPressed
      );

      // rotate model
      this.rotateQuarternion.setFromAxisAngle(
        this.rotateAngle,
        angleYCameraDirection + directionCharacterOffset
      );
      this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2);

      // calculate direction
      this.camera.getWorldDirection(this.walkDirection);
      this.walkDirection.y = 0;
      this.walkDirection.normalize();
      this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

      // walk velocity
      const velocity = this.walkVelocity;

      // move model & camera
      const moveX = this.walkDirection.x * velocity * delta;
      const moveZ = this.walkDirection.z * velocity * delta;
      this.model.position.x += moveX;
      this.model.position.z += moveZ;
      this.updateCameraTarget(moveX, moveZ);
    }
  }

  private updateCameraTarget(moveX: number, moveZ: number) {
    // move camera
    this.camera.position.x += moveX;
    this.camera.position.z += moveZ;

    // update camera target
    this.cameraTarget.x = this.model.position.x;
    this.cameraTarget.y = this.model.position.y + 1;
    this.cameraTarget.z = this.model.position.z;
    this.orbitControl.target = this.cameraTarget;
  }

  private directionOffset(keysPressed: any) {
    let directionOffset = 0; // w

    if (keysPressed[W]) {
      if (keysPressed[A]) {
        directionOffset = Math.PI / 4; // w+a
      } else if (keysPressed[D]) {
        directionOffset = -Math.PI / 4; // w+d
      }
    } else if (keysPressed[S]) {
      if (keysPressed[A]) {
        directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
      } else if (keysPressed[D]) {
        directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
      } else {
        directionOffset = Math.PI; // s
      }
    } else if (keysPressed[A]) {
      directionOffset = Math.PI / 2; // a
    } else if (keysPressed[D]) {
      directionOffset = -Math.PI / 2; // d
    }

    return directionOffset;
  }
  private directionCharacterOffset(keysPressed: any) {
    let directionOffset = Math.PI; // w

    if (keysPressed[W]) {
      if (keysPressed[A]) {
        directionOffset = Math.PI + Math.PI / 4; // w+a
      } else if (keysPressed[D]) {
        directionOffset = Math.PI - Math.PI / 4; // w+d
      }
    } else if (keysPressed[S]) {
      if (keysPressed[A]) {
        directionOffset = Math.PI / 4 - Math.PI / 2; // s+a
      } else if (keysPressed[D]) {
        directionOffset = -Math.PI / 4 + Math.PI / 2; // s+d
      } else {
        directionOffset = 0; // s
      }
    } else if (keysPressed[A]) {
      directionOffset = -Math.PI / 2; // a
    } else if (keysPressed[D]) {
      directionOffset = +Math.PI / 2; // d
    }

    return directionOffset;
  }
}
