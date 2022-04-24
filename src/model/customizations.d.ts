export type CustomizationTranslation = {
  [key: string]: string;
};

export type CustomizationTranslations = {
  [key: string]: CustomizationTranslation;
};

export type CustomizationAssets = {
  arIcon?: string;
};

export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

export type SceneCustomizationsGeneral = {
  intensity: number;
  visible: boolean;
};

export type SceneCustomizationsControls = {
  rotation: Vector3;
};

export type SceneCustomizationsShadow = {
  blur: number;
  darkness: number;
  opacity: number;
};

type SceneCustomizationsShadowBacked = {
  position: Vector3;
  rotation: Vector3;
};

export type SceneCustomizationsLight = {
  position: Vector3;
  general: SceneCustomizationsGeneral;
};

export type SceneCustomizationsLights = {
  lights: {
    directionalLightBack: SceneCustomizationsLight;
    directionalLightLeft: SceneCustomizationsLight;
    pointLightBack: SceneCustomizationsLight;
    pointLightFront: SceneCustomizationsLight;
    ambientLight: SceneCustomizationsLight;
    hemisphereLight: SceneCustomizationsLight;
  };
};

export type SceneCustomizationsObject = {
  rotation: Vector3;
  position: Vector3;
};

type CameraConfig = {
  far: number;
  near: number;
  fov: number;
};

export type SceneCustomizationsCamera = {
  position: Vector3;
  config: CameraConfig;
};

export type SceneCustomizations = {
  controls: SceneCustomizationsControls;
  shadowBacked: SceneCustomizationsShadowBacked;
  shadow: SceneCustomizationsShadow;
  lights: SceneCustomizationsLights;
  environment: { intensity: number };
  object: SceneCustomizationsObject;
  camera: SceneCustomizationsCamera;
};

export type CustomizationParams = {
  tipText: string;
  showTip: boolean;
  showTopHand: boolean;
  sceneCustomization: SceneCustomizations;
};

export type CustomizationKey = {
  customizationId: string;
  productId: string;
  projectId?: string | null;
};

export type ConfigCustomization = {
  translations?: CustomizationTranslations;
  assets?: CustomizationAssets;
  params?: CustomizationParams;
};
