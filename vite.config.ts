/// <reference types="vitest/config"/>
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
	],
	build: {
		chunkSizeWarningLimit: 700,
		rollupOptions: {
			treeshake: true,
			output: {
				manualChunks: (id) => {
					if (id.includes("xlsx")) return "xlsx";
				},
			},
		},
	},
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: ["vitest-localstorage-mock", "src/__tests__/setupTest.ts"],
		server: {
			deps: {
				inline: ["@mui/x-data-grid"],
			},
		},
		coverage: {
			provider: "v8",
			enabled: false,
		},
	},
});
