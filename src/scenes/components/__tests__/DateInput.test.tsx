import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { afterEach, describe, expect, it, vi } from "vitest";
import DateInput from "../DateInput/DateInput";

describe("DateInput component", () => {
	const onChange = vi.fn();
	const date = new Date("2026-08-22T10:30:00");

	const queryInput = (name: "Day" | "Month" | "Year" | "Hours" | "Minutes") =>
		screen.queryByRole("spinbutton", { name: name });

	const getInput = (name: "Day" | "Month" | "Year" | "Hours" | "Minutes") =>
		screen.getByRole("spinbutton", { name: name });

	afterEach(() => vi.useRealTimers());

	it("Renders date without time", () => {
		render(
			<DateInput date={date} onChange={onChange} title="Title" hideTime />,
		);

		const day = getInput("Day");
		expect(day).toHaveTextContent("22");
		const month = getInput("Month");
		expect(month).toHaveTextContent("08");
		const year = getInput("Year");
		expect(year).toHaveTextContent("2026");
		expect(queryInput("Hours")).toBeNull();
		expect(queryInput("Minutes")).toBeNull();
	});

	it("Renders date with time", () => {
		render(<DateInput date={date} onChange={onChange} title="Title" />);

		const day = getInput("Day");
		expect(day).toHaveTextContent("22");
		const month = getInput("Month");
		expect(month).toHaveTextContent("08");
		const year = getInput("Year");
		expect(year).toHaveTextContent("2026");
		const hours = getInput("Hours");
		expect(hours).toHaveTextContent("10");
		const minutes = getInput("Minutes");
		expect(minutes).toHaveTextContent("30");
	});

	it("Changing datetime is debounced", async () => {
		// TODO!
		// Should use fakeTimers, but changing the input doesn't work with fireEvent and fake timers don't work with userEvent
		render(
			<DateInput date={date} onChange={onChange} title="Title" ms={100} />,
		);

		const day = getInput("Day");
		expect(day).toHaveTextContent("22");

		await userEvent.type(day, "21");
		expect(onChange).not.toHaveBeenCalled();
		expect(day).toHaveTextContent("21");

		await waitFor(() =>
			expect(onChange).toHaveBeenCalledExactlyOnceWith(
				dayjs("2026-08-21T10:30:00Z"),
			),
		);
	});

	it("Changing date is debounced", async () => {
		// TODO!
		// Should use fakeTimers, but changing the input doesn't work with fireEvent and fake timers don't work with userEvent
		render(
			<DateInput
				date={date}
				onChange={onChange}
				title="Title"
				ms={100}
				hideTime
			/>,
		);

		const day = getInput("Day");
		expect(day).toHaveTextContent("22");

		await userEvent.type(day, "21");
		expect(onChange).not.toHaveBeenCalled();
		expect(day).toHaveTextContent("21");

		await waitFor(() =>
			expect(onChange).toHaveBeenCalledExactlyOnceWith(
				dayjs("2026-08-21T10:30:00Z"),
			),
		);
	});

	it("Button offers options now, ok, cancel", async () => {
		vi.useFakeTimers();
		const newDate = new Date("2024-10-12T12:30:00Z");
		vi.setSystemTime(newDate);
		render(<DateInput date={date} onChange={onChange} title="Title" />);

		const button = screen.getByRole("button");
		await act(async () => fireEvent.click(button));

		screen.getByText("Abbrechen");
		screen.getByText("Ok");
		const nowButton = screen.getByRole("button", { name: "Jetzt" });

		await act(async () => fireEvent.click(nowButton));
		await act(async () => vi.advanceTimersByTime(500));
		expect(onChange).toHaveBeenCalled();
		const actual = onChange.mock.lastCall?.[0];
		expect(dayjs(newDate).isSame(actual));
	});
});
