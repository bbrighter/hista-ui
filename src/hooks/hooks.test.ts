import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useHista from "../store/store";
import { usePiidEffect } from "./usePiidEffect";

describe("usePiidEffect", () => {
	beforeEach(() => {
		act(() => useHista.getState().setPiid(""));
	});

	it("piid set", async () => {
		const fn = vi.fn();
		const { setPiid } = useHista.getState();
		act(() => setPiid("test-piid"));

		renderHook(() => usePiidEffect(fn, []));

		await waitFor(() => expect(fn).toHaveBeenCalled());
	});

	it("no piid set", async () => {
		const fn2 = vi.fn();
		act(() => useHista.getState().setPiid(""));

		renderHook(() => usePiidEffect(fn2, []));

		// allow effects to settle
		await new Promise((r) => setTimeout(r, 0));
		expect(fn2).not.toHaveBeenCalled();
	});

	it("called again when piid changes", async () => {
		const fn = vi.fn();
		const { setPiid } = useHista.getState();
		act(() => setPiid("test-piid"));

		renderHook(() => usePiidEffect(fn, []));

		await waitFor(() => expect(fn).toHaveBeenCalledOnce());

		act(() => setPiid("new-piid"));
		await waitFor(() => expect(fn).toHaveBeenCalledTimes(2));
	});

	it("rerendering should not trigger it again, otherwise infinite loops", async () => {
		const fn = vi.fn();
		act(() => useHista.getState().setPiid("piid"));

		const { rerender } = renderHook(({ fn }) => usePiidEffect(fn, []), {
			initialProps: { fn: fn },
		});
		await waitFor(() => expect(fn).toHaveBeenCalledOnce());

		const newFnRef = vi.fn();
		rerender({ fn: newFnRef });
		expect(fn).toHaveBeenCalledOnce();
		expect(newFnRef).not.toHaveBeenCalled();
	});
});
