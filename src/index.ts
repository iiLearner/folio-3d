import "./assets/app.css";
import { waitForSelector } from "./dom";
import optionsService, { Options } from "./options";
import { create as createFolio } from "./viewer";

const App = async (opts: Options = {} as Options): Promise<void> => {
  const { selector } = opts;

  const container = await waitForSelector(selector);

  /**
   * save input options
   */
  optionsService.save(opts);

  try {
    /**
     * finally create the viewer
     */
    return createFolio(container);
  } catch (ex) {
    /**
     * handle what happens if something goes wrong
     */
    console.error(ex);
  }
};

export default App;
