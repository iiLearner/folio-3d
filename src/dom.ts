export const htmlToDomElement = (html: string): HTMLElement => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.firstElementChild as HTMLElement;
};

export const waitForSelector = (
  selector: string,
  timeout: number = 60 * 1000,
  base: ParentNode = document
): Promise<Element> => {
  let interval;
  const DELAY = 50;

  return new Promise(function (resolve, reject) {
    const start = Date.now();
    const element = base.querySelector(selector);

    if (element !== null) {
      resolve(element);
    }

    interval = window.setInterval(function () {
      const element = base.querySelector(selector);
      if (element) {
        if (element !== null) {
          resolve(element);
        }
        window.clearInterval(interval);
      }

      if (!timeout) {
        return;
      }

      if (Date.now() - start > timeout) {
        reject(new Error("Element not foud"));
        window.clearInterval(interval);
      }
    }, DELAY);
  });
};