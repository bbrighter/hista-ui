import "@testing-library/jest-dom/vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, beforeEach, expect, vi } from "vitest";

import useHista from "../store/store";
import { PIID } from "./fixtures/piid";
import handlers from "./mocks/handlers";

expect.extend(matchers);

export const server = setupServer(...handlers);

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
