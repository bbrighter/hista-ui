import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po"; // If removed, adapt knip.config.ts

export default defineConfig({
	sourceLocale: "de-DE",
	locales: ["de-DE", "de-SW"],
	catalogs: [
		{
			path: "<rootDir>/src/locales/{locale}/messages",
			include: ["src"],
		},
	],
	format: formatter({ lineNumbers: false, origins: false }),
});
