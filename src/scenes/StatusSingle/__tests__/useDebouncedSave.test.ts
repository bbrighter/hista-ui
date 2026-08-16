import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDebouncedSave } from "../StatusSliders/useDebouncedSave";

describe("useDebouncedSave", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	const debounceTime = 1000;

	it("saves after the debounce delay", async () => {
		vi.useFakeTimers();

		const save = vi.fn().mockResolvedValue(undefined);

		const { result } = renderHook(() => useDebouncedSave(save, debounceTime));

		act(() => {
			result.current("foo");
		});

		expect(save).not.toHaveBeenCalled();

		await act(async () => {
			vi.advanceTimersByTime(debounceTime);
		});

		expect(save).toHaveBeenCalledOnce();
		expect(save).toHaveBeenCalledWith("foo");
	});

	it("only saves the latest value when changes happen during the debounce period", async () => {
		vi.useFakeTimers();

		const save = vi.fn().mockResolvedValue(undefined);

		const { result } = renderHook(() => useDebouncedSave(save, debounceTime));

		act(() => {
			result.current("a");
			vi.advanceTimersByTime(500);

			result.current("b");
			vi.advanceTimersByTime(500);

			result.current("c");
		});

		await act(async () => {
			vi.advanceTimersByTime(debounceTime);
		});

		expect(save).toHaveBeenCalledOnce();
		expect(save).toHaveBeenCalledWith("c");
	});

	it("queues a new value while a save is in progress", async () => {
		vi.useFakeTimers();

		let resolveFirst: () => void;

		const save = vi
			.fn()
			.mockImplementationOnce(
				() =>
					new Promise<void>((resolve) => {
						resolveFirst = resolve;
					}),
			)
			.mockResolvedValue(undefined);

		const { result } = renderHook(() => useDebouncedSave(save, debounceTime));

		// Start first save
		act(() => {
			result.current("first");
			vi.advanceTimersByTime(debounceTime);
		});

		expect(save).toHaveBeenCalledTimes(1);
		expect(save).toHaveBeenLastCalledWith("first");

		// Queue second value while first is still running
		act(() => {
			result.current("second");
			vi.advanceTimersByTime(debounceTime);
		});

		expect(save).toHaveBeenCalledTimes(1);

		// Finish first save
		await act(async () => {
			resolveFirst();
		});

		expect(save).toHaveBeenCalledTimes(2);
		expect(save).toHaveBeenLastCalledWith("second");
	});
});
