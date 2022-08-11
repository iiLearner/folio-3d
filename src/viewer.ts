import Experience from "./scene/Experience";

export const create = (container: Element) => {
  container.setAttribute("data-folio", "");

  const experience = new Experience(container);
  experience.init();
  experience.initSetup();
};
