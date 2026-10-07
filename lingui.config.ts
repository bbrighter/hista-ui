import { defineConfig } from "@lingui/cli";

export default defineConfig({
	sourceLocale: "de-DE",
	locales: ["de-DE", "de-SW"],
	catalogs: [
		{
			path: "<rootDir>/src/locales/{locale}/messages",
			include: ["src"],
		},
	],
});
