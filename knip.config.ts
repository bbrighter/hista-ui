import type { KnipConfig } from "knip";

const config: KnipConfig = {
	ignore: ["src/api/generatedApi.ts", "scripts/*"],
	ignoreBinaries: [
		"dot", // Needed to visualize results from dependency-cruiser
		"tsc", // Currently, two TS versions are in use
	],
	ignoreDependencies: [
		"source-map", // Needed for the script evaluateMinifiedBuild.js
	],
};

export default config;
