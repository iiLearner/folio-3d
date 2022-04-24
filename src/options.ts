export type Options = {
  selector: string;
};

let options: Options | null = null;

const save = (opts: Options) => {
  options = Object.freeze(opts);
};

const get = () => {
  return Object.assign({}, options);
};

const optionService = { save, get };

export default optionService;

export type shadowOptions = {
  add(): void;
  remove(): void;
};
