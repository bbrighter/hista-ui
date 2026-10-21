import { data, isRouteErrorResponse } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { APIError, ErrCode } from "../api/generatedApi";
import { toAppError, withErrorHandling } from "./errorHandler";

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

describe("withErrorHandling", () => {
	const fn = vi.fn();

	afterEach(() => {
		vi.useRealTimers();
	});

	it("No error", async () => {
		fn.mockResolvedValue("ok");

		const resp = await withErrorHandling(fn);
		expect(resp).toBe("ok");
	});

	it("Error 404 returns null", async () => {
		fn.mockRejectedValue(
			new APIError(404, { code: ErrCode.NotFound, message: "not found" }),
		);

		const resp = await withErrorHandling(fn);
		expect(resp).toBeNull();
	});

	it("Error 503 retries at leastonce", async () => {
		vi.useFakeTimers();
		fn.mockRejectedValueOnce(
			new APIError(503, { code: ErrCode.ResourceExhausted, message: "oh no" }),
		).mockResolvedValueOnce("ok");

		const promise = withErrorHandling(fn);
		await vi.advanceTimersByTimeAsync(0);
		expect(fn).toHaveBeenCalledOnce();

		vi.advanceTimersByTime(500);
		const resp = await promise;
		expect(fn).toHaveBeenCalledTimes(2);

		expect(resp).toBe("ok");
	});

	it("Error 503 retries at most once", async () => {
		vi.useFakeTimers();
		fn.mockRejectedValue(
			new APIError(503, { code: ErrCode.ResourceExhausted, message: "oh no" }),
		);

		const promise = withErrorHandling(fn);
		await vi.advanceTimersByTimeAsync(20);
		expect(fn).toHaveBeenCalledOnce();

		vi.advanceTimersByTime(500);
		const resp = await promise;
		expect(fn).toHaveBeenCalledTimes(2);

		expect(resp).toBeNull();

		vi.advanceTimersByTime(5000);
		expect(fn).toHaveBeenCalledTimes(2);
	});
});
