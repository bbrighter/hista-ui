import type { KnipConfig } from "knip";

const config: KnipConfig = {
	ignore: ["src/api/generatedApi.ts", "scripts/*", "lingui.config.ts"],
	ignoreBinaries: [
		"dot", // Needed to visualize results from dependency-cruiser
	],
	ignoreDependencies: [
		"source-map", // Needed for the script evaluateMinifiedBuild.js
	],
};

export default config;
