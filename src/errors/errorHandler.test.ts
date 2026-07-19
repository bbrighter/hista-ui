import { data, isRouteErrorResponse } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { APIError, ErrCode } from "../api/generatedApi";
import { toAppError } from "./errorHandler";

describe("errors are transformed into app errors", () => {
	it("Route error", { skip: true }, () => {
		// How to create a route error?
		const error = data(
			{ content: "content" },
			{ status: 500, statusText: "internal" },
		);
		expect(isRouteErrorResponse(error)).toBeTruthy();

		const appError = toAppError(error);
		expect(appError.source).toBe("router");
	});

	it("API error", () => {
		const error = new APIError(500, {
			code: ErrCode.Internal,
			message: "message",
		});

		const appError = toAppError(error);
		expect(appError.source).toBe("api");
		expect(appError.status).toBe(500);
		expect(appError.text).toBe("message");
	});

	it("other errors", () => {
		const error = new Error("message");

		const appError = toAppError(error);
		expect(appError.source).toBe("unknown");
		expect(appError.text).toBe("message");
		expect(appError.stack).toContain("Error: message");
	});

	it("anything else", { skip: true }, () => {
		// How to test it?
	});
});
