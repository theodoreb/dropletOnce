import * as fs from "fs";
import { minify } from "terser";

const files = {
  "once.js": {
    enclose: "window:window"
  },
  "once.jquery.js": {}
};
const defaults = {
  module: true,
  sourceMap: {
    includeSources: true
  }
};

// eslint-disable-next-line no-restricted-syntax
for (const [path, options] of Object.entries(files)) {
  const source = `./src/${path}`;
  const destination = `./dist/${path.slice(0, -3)}.min.js`;

  const contents = fs.readFileSync(source, {
    encoding: "utf-8"
  });
  // Transform the module to an IIFE.
  const toTransform = contents.replace(
    /^export default (.*);$/m,
    "window.$1 = $1;"
  );

  // Minify.
  minify(toTransform, { ...defaults, ...options }).then(({ code, map }) => {
    fs.writeFile(destination, code, () => {});
    fs.writeFile(`${destination}.map`, map, () => {});
  });
}
