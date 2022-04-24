import Experience from './scene/Experience';


export const create = async (
  container: Element,
): Promise<void> => {
  container.setAttribute("data-ff-viewer", "");

    new Experience(container);

};