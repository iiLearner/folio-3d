import createEnvMap from "./environment-map";

export const createEnvironmentMap = async (
  renderer: THREE.WebGLRenderer,
) => {
  createEnvMap(renderer)
};
