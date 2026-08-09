import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DebouncedSlider from "./DebouncedSlider";

describe("debounced slider", () => {
	const debounce = 300;

	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
		vi.resetAllMocks();
	});
	const onChange = vi.fn();

	it("Renders", () => {
		render(
			<DebouncedSlider initialValue={0} onChange={onChange} label="label" />,
		);

		screen.getByText("label");
		const slider = screen.getByRole("slider");
		expect(slider).toHaveValue("0");
	});

	it("Change is debounced", () => {
		render(
			<DebouncedSlider initialValue={0} onChange={onChange} label="label" />,
		);
		const slider = screen.getByRole("slider");

		fireEvent.change(slider, { target: { value: 1 } });
		expect(onChange).not.toHaveBeenCalled();
		expect(slider).toHaveValue("1");

		act(() => vi.advanceTimersByTime(debounce));
		expect(onChange).toHaveBeenCalledExactlyOnceWith(1);
	});

	it("Multiple changes are debounced", () => {
		render(
			<DebouncedSlider initialValue={0} onChange={onChange} label="label" />,
		);
		const slider = screen.getByRole("slider");

		fireEvent.change(slider, { target: { value: 1 } });
		expect(onChange).not.toHaveBeenCalled();
		expect(slider).toHaveValue("1");

		act(() => vi.advanceTimersByTime(25));

		fireEvent.change(slider, { target: { value: 2 } });
		expect(onChange).not.toHaveBeenCalled();
		expect(slider).toHaveValue("2");

		act(() => vi.advanceTimersByTime(debounce));
		expect(onChange).toHaveBeenCalledExactlyOnceWith(2);
	});

	it("Initially, no onChange is applied", () => {
		render(
			<DebouncedSlider initialValue={0} onChange={onChange} label="label" />,
		);

		vi.advanceTimersByTime(debounce);
		expect(onChange).not.toHaveBeenCalled();
	});

	it("MUI Color mapping", () => {
		const colorMapping = (v: number) => (v < 2 ? "error" : "info");
		render(
			<DebouncedSlider
				initialValue={0}
				onChange={onChange}
				label="label"
				muiColorMapping={colorMapping}
			/>,
		);

		const slider = screen.getByRole("slider");
		const root = slider.closest(".MuiSlider-root") as HTMLElement;
		expect(root).toHaveClass("MuiSlider-colorError");

		fireEvent.change(slider, { target: { value: 3 } });
		act(() => vi.advanceTimersByTime(debounce));
		expect(root).toHaveClass("MuiSlider-colorInfo");
	});

	it("Color mapping", () => {
		const colorMapping = (v: number) => (v < 2 ? "#fff000" : "#000fff");
		render(
			<DebouncedSlider
				initialValue={0}
				onChange={onChange}
				label="label"
				colorMapping={colorMapping}
			/>,
		);

		const slider = screen.getByRole("slider");
		const thumb = slider.closest(".MuiSlider-thumb") as HTMLElement;
		expect(thumb).toHaveStyle({ backgroundColor: "#fff000" });

		fireEvent.change(slider, { target: { value: 3 } });
		act(() => vi.advanceTimersByTime(debounce));

		expect(thumb).toHaveStyle({ backgroundColor: "#000fff" });
	});

	it("Icon mapping", () => {
		const iconMapping = (v: number) => (v < 2 ? <div>A</div> : <div>B</div>);
		render(
			<DebouncedSlider
				initialValue={0}
				onChange={onChange}
				label="label"
				iconMapping={iconMapping}
			/>,
		);

		screen.getByText("A");

		const slider = screen.getByRole("slider");
		fireEvent.change(slider, { target: { value: 3 } });
		act(() => vi.advanceTimersByTime(debounce));

		screen.getByText("B");
	});
});
