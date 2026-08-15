import { act, fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MealSettings } from "../MealSettings/MealSettings";
import { getIsAloneButtons, getSlider } from "./selectors";

describe("MealSettings component", () => {
	const setDate = vi.fn();
	const setStressLevel = vi.fn();
	const setFreshness = vi.fn();
	const setAloneness = vi.fn();

	afterEach(() => vi.useRealTimers());

	it("Data is displayed", async () => {
		render(
			<MealSettings
				setDate={setDate}
				setAloneness={setAloneness}
				setFreshness={setFreshness}
				setStressLevel={setStressLevel}
				date={new Date("2024-12-03")}
				freshness={2}
				isAlone={true}
				stressLevel={1}
			/>,
		);

		const stressSlider = getSlider("Stress");
		expect(stressSlider).toHaveValue("1");

		const freshnessSlider = getSlider("Frische");
		expect(freshnessSlider).toHaveValue("2");

		expect(getIsAloneButtons("Alleine")).toBePressed();

		expect(getIsAloneButtons("Zusammen")).not.toBePressed();
	});

	it("Toggle button isNotAlone", async () => {
		render(
			<MealSettings
				setDate={setDate}
				setAloneness={setAloneness}
				setFreshness={setFreshness}
				setStressLevel={setStressLevel}
				date={new Date("2024-12-03")}
				freshness={2}
				isAlone={true}
				stressLevel={1}
			/>,
		);

		await userEvent.click(getIsAloneButtons("Alleine"));
		expect(setAloneness).not.toHaveBeenCalled();

		await userEvent.click(getIsAloneButtons("Zusammen"));
		expect(setAloneness).toHaveBeenCalledWith(false);
	});

	it("Toggle button isAlone", async () => {
		render(
			<MealSettings
				setDate={setDate}
				setAloneness={setAloneness}
				setFreshness={setFreshness}
				setStressLevel={setStressLevel}
				date={new Date("2024-12-03")}
				freshness={2}
				isAlone={false}
				stressLevel={1}
			/>,
		);

		await userEvent.click(getIsAloneButtons("Zusammen"));
		expect(setAloneness).not.toHaveBeenCalled();

		await userEvent.click(getIsAloneButtons("Alleine"));
		expect(setAloneness).toHaveBeenCalledWith(true);
	});

	it("Change stress", async () => {
		vi.useFakeTimers();
		render(
			<MealSettings
				setDate={setDate}
				setAloneness={setAloneness}
				setFreshness={setFreshness}
				setStressLevel={setStressLevel}
				date={new Date("2024-12-03")}
				freshness={2}
				isAlone={true}
				stressLevel={1}
			/>,
		);

		const stressSlider = getSlider("Stress");
		fireEvent.change(stressSlider, { target: { value: 3 } });

		expect(setStressLevel).not.toHaveBeenCalled();
		await act(async () => {
			vi.advanceTimersByTime(300);
		});
		expect(setStressLevel).toHaveBeenCalledExactlyOnceWith(3);
	});

	it("Change freshness", async () => {
		vi.useFakeTimers();
		render(
			<MealSettings
				setDate={setDate}
				setAloneness={setAloneness}
				setFreshness={setFreshness}
				setStressLevel={setStressLevel}
				date={new Date("2024-12-03")}
				freshness={2}
				isAlone={true}
				stressLevel={1}
			/>,
		);

		const freshnessSlider = getSlider("Frische");
		fireEvent.change(freshnessSlider, { target: { value: 0 } });

		expect(setFreshness).not.toHaveBeenCalled();
		await act(async () => {
			vi.advanceTimersByTime(400);
		});
		expect(setFreshness).toHaveBeenCalledExactlyOnceWith(0);
	});

	it.skip("Change date", async () => {});
});
