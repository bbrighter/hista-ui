import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HeadacheDebouncedDescription } from "../HeadacheDescription/HeadacheDescription";
import { getDescriptionTextBox } from "./selectors";

describe("HeadacheDescription component", () => {
	const saveDescription = vi.fn();
	const debounceTime = 1000;

	afterEach(() => vi.useRealTimers());

	const textboxIsDirty = (elem: HTMLTextAreaElement) => {
		const outlinedInput = elem.closest(".MuiOutlinedInput-root");
		return outlinedInput?.classList.contains("MuiInputBase-colorSecondary");
	};

	it("Editing uses debouncing", async () => {
		vi.useFakeTimers();
		render(
			<HeadacheDebouncedDescription
				description="Description"
				saveDescription={saveDescription}
			/>,
		);

		const textbox = getDescriptionTextBox();
		expect(textbox).toHaveValue("Description");
		fireEvent.change(textbox, { target: { value: "New description" } });
		expect(saveDescription).not.toHaveBeenCalled();
		expect(textbox).toHaveValue("New description");
		expect(textboxIsDirty(textbox)).toBe(true);

		await act(async () => vi.advanceTimersByTime(debounceTime));
		expect(saveDescription).toHaveBeenCalledExactlyOnceWith("New description");
	});

	it("Only save if isDirty is true", async () => {
		vi.useFakeTimers();
		render(
			<HeadacheDebouncedDescription
				description="Description"
				saveDescription={saveDescription}
			/>,
		);

		const textbox = getDescriptionTextBox();
		fireEvent.change(textbox, { target: { value: "New description" } });
		await act(async () => vi.advanceTimersByTime(debounceTime / 2));
		fireEvent.change(textbox, { target: { value: "Description" } });
		await act(async () => vi.advanceTimersByTime(debounceTime));
		expect(saveDescription).not.toHaveBeenCalled();
	});

	it("Updats description when props change", async () => {
		vi.useFakeTimers();
		const { rerender } = render(
			<HeadacheDebouncedDescription
				description="Description"
				saveDescription={saveDescription}
			/>,
		);

		const textbox = getDescriptionTextBox();
		fireEvent.change(textbox, { target: { value: "New description" } });
		expect(textboxIsDirty(textbox)).toBe(true);

		rerender(
			<HeadacheDebouncedDescription
				description="New description"
				saveDescription={saveDescription}
			/>,
		);
		expect(textbox).toHaveValue("New description");
		expect(textboxIsDirty(textbox)).toBe(false);
	});
});
