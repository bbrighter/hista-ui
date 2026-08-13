import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MealSettings } from "./MealSettings";

describe("MealSettings component", () => {
	const setDate = vi.fn();
	const setStressLevel = vi.fn();
	const setFreshness = vi.fn();
	const setAloneness = vi.fn();

	beforeEach(() => {
		vi.resetAllMocks();
	});

	const findSliderValue = async (label: string) => {
		const sliderLabel = await screen.findByText(label);
		const box = sliderLabel.closest("div") as HTMLElement;
		expect(box).not.toBeNull();

		const input = box.querySelector("input");
		expect(input).not.toBeNull();
		return input as HTMLElement;
	};

	const getIsAloneButton = () =>
		screen.getByRole("button", {
			description: "Alleine",
		});
	const getIsNotAloneButton = () =>
		screen.getByRole("button", {
			description: "Zusammen",
		});

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

		const stressSlider = await findSliderValue("Stress");
		expect(stressSlider).toHaveValue("1");

		const freshnessSlider = await findSliderValue("Frische");
		expect(freshnessSlider).toHaveValue("2");

		expect(getIsAloneButton()).toBePressed();

		expect(getIsNotAloneButton()).not.toBePressed();
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

		await userEvent.click(getIsAloneButton());
		expect(setAloneness).not.toHaveBeenCalled();

		await userEvent.click(getIsNotAloneButton());
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

		await userEvent.click(getIsNotAloneButton());
		expect(setAloneness).not.toHaveBeenCalled();

		await userEvent.click(getIsAloneButton());
		expect(setAloneness).toHaveBeenCalledWith(true);
	});

	it.skip("Change freshness", async () => {});

	it.skip("Change stress", async () => {});

	it.skip("Change date", async () => {});
});
