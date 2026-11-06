import { act, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@/__tests__/setupTest";
import { HeadacheDebouncedDescription } from "../HeadacheDescription/HeadacheDescription";
import { getDescriptionTextBox } from "./selectors";

describe("HeadacheDescription component", () => {
	const saveDescription = vi.fn().mockResolvedValue(undefined);
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
				isLoaded
			/>,
		);

		const textbox = getDescriptionTextBox();
		expect(textbox).toHaveValue("Description");
		fireEvent.change(textbox, { target: { value: "New description" } });
		expect(saveDescription).not.toHaveBeenCalled();
		expect(textbox).toHaveValue("New description");
		expect(textboxIsDirty(textbox)).toBe(true);

		await act(async () => vi.advanceTimersByTimeAsync(debounceTime));
		expect(saveDescription).toHaveBeenCalledExactlyOnceWith("New description");
	});

	it("Only save if isDirty is true", async () => {
		vi.useFakeTimers();
		render(
			<HeadacheDebouncedDescription
				description="Description"
				saveDescription={saveDescription}
				isLoaded
			/>,
		);

		const textbox = getDescriptionTextBox();
		fireEvent.change(textbox, { target: { value: "New description" } });
		await act(async () => vi.advanceTimersByTime(debounceTime / 2));
		fireEvent.change(textbox, { target: { value: "Description" } });
		await act(async () => vi.advanceTimersByTime(debounceTime));
		expect(saveDescription).not.toHaveBeenCalled();
	});

	// It should only get the first real entry... whatever that means
	it.skip("Updats description when props change", async () => {
		vi.useFakeTimers();
		const { rerender } = render(
			<HeadacheDebouncedDescription
				description="Description"
				saveDescription={saveDescription}
				isLoaded
			/>,
		);

		const textbox = getDescriptionTextBox();
		fireEvent.change(textbox, { target: { value: "New description" } });
		expect(textboxIsDirty(textbox)).toBe(true);

		rerender(
			<HeadacheDebouncedDescription
				description="New description"
				saveDescription={saveDescription}
				isLoaded
			/>,
		);
		expect(textbox).toHaveValue("New description");
		expect(textboxIsDirty(textbox)).toBe(false);
	});

	it("Description does not change when typing during long running save", async () => {
		let resolveSave: () => void;
		vi.useFakeTimers();
		saveDescription.mockImplementation(
			() => new Promise<void>((resolve) => (resolveSave = resolve)),
		);

		const { rerender } = render(
			<HeadacheDebouncedDescription
				description="Description"
				saveDescription={saveDescription}
				isLoaded
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

		fireEvent.change(textbox, { target: { value: "Another description" } });

		await act(async () => {
			resolveSave();
			rerender(
				<HeadacheDebouncedDescription
					description="New description"
					saveDescription={saveDescription}
					isLoaded
				/>,
			);
		});

		expect(textbox).toHaveValue("Another description");
		expect(textboxIsDirty(textbox)).toBe(true);
	});

	it("Changing isLoaded updates description", async () => {
		const { rerender } = render(
			<HeadacheDebouncedDescription
				description=""
				saveDescription={saveDescription}
				isLoaded={false}
			/>,
		);

		const textbox = getDescriptionTextBox();
		expect(textbox).toHaveValue("");

		rerender(
			<HeadacheDebouncedDescription
				description="Description"
				saveDescription={saveDescription}
				isLoaded
			/>,
		);
		expect(textbox).toHaveValue("Description");
	});
});
