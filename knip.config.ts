import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [
    "src/api/generatedApi.ts",
  ],
  ignoreBinaries: [
    "dot", // Needed to visualize results from dependency-cruiser
  ],
  ignoreDependencies: ["prettier"],
};

export default config;
