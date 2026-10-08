/// <reference types="vitest/config"/>

import path from "node:path";
import { lingui } from "@lingui/vite-plugin";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		checker({
			typescript: true,
			biome: {
				command: "check",
			},
		}),
		visualizer({
			filename: "bundle-stats.html",
			open: true,
		}),
		lingui({ macroTransform: true }),
	],
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
		},
	},
	build: {
		chunkSizeWarningLimit: 700,
		rolldownOptions: {
			treeshake: true,
		},
	},
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: ["src/__tests__/setupTest.tsx"],
		env: {
			TZ: "utc",
		},
		server: {
			deps: {
				inline: ["@mui/x-data-grid"],
			},
		},
		coverage: {
			provider: "v8",
			enabled: false,
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
		},
	},
});
