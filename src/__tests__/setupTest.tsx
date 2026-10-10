import "@testing-library/jest-dom/vitest";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup, render } from "@testing-library/react";
import { setupServer } from "msw/node";
import type { ReactElement } from "react";
import { afterAll, afterEach, beforeAll, beforeEach, expect, vi } from "vitest";
import { messages } from "@/locales/de-DE/messages";
import useHista from "../store/store";
import { PIID } from "./fixtures/piid";
import handlers from "./mocks/handlers";

expect.extend(matchers);

const server = setupServer(...handlers);

i18n.load({ "de-DE": messages });
i18n.activate("de-DE");

const customRender = (ui: ReactElement) => {
	i18n.load({ "de-DE": messages });
	i18n.activate("de-DE");
	return render(ui, {
		wrapper: ({ children }) => (
			<I18nProvider i18n={i18n}>{children}</I18nProvider>
		),
	});
};

export { customRender as render, server };

beforeAll(() => {
	vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
	vi.spyOn(Storage.prototype, "getItem").mockReturnValue("test-token");
	vi.spyOn(Storage.prototype, "clear").mockImplementation(() => {});

	server.listen({ onUnhandledRequest: "error" });

	if (import.meta.env.MODE === "debug") {
		server.events.on("request:start", ({ request }) => {
			// eslint-disable-next-line no-console
			console.log("➡️", request.method, request.url);
			// eslint-disable-next-line no-console
			console.log("   Headers:", Object.fromEntries(request.headers.entries()));
		});
	}
});

beforeEach(() => {
	vi.resetAllMocks();
	const store = useHista.getState();
	store.resetLoaded();
	store.setPiid(PIID);
});
afterEach(() => {
	server.resetHandlers();
	cleanup();
});
afterAll(() => {
	server.close();
});
