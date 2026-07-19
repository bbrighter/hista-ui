// This script can be used to find out in which file a minified JS had an error.
// Run `pnpm build --sourcemap`
// Adapt the sourceMapFile, the line and the column

import fs from "node:fs";
import { SourceMapConsumer } from "source-map";

const sourceMapFile = "dist/assets/actions-BDjzrkkC.js.map";
const line = 136;        
const column = 110860;  

const map = JSON.parse(fs.readFileSync(sourceMapFile, "utf8"));

SourceMapConsumer.with(map, null, consumer => {
  const pos = consumer.originalPositionFor({ line, column });
  console.log(pos);
});