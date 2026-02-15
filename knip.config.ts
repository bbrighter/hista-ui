import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [
    "src/__tests__/__mocks__/authStoreMock.ts",
    "src/__tests__/__mocks__/errorStoreMock.ts",
    "src/api/generatedApi.ts",
  ],
  ignoreBinaries: [
    "dot", // Needed to visualize results from dependency-cruiser
  ],
  ignoreDependencies: ["prettier"],
};

export default config;
