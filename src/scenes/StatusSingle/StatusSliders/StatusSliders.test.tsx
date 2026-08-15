import { act, fireEvent, render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Status } from "@/store";
import { StatusSliders } from "./StatusSliders";

describe("StatusSliders component", () => {
	const debounceTimeout = 2000;
	const testStatus: Status = {
		date: dayjs(new Date("2022-11-12")),
		eveningFitness: 3,
		id: 1,
		morningFitness: 2,
		morningSleep: null,
		appetiteChanges: null,
		concentrationProblems: null,
		depressive: null,
		irritable: null,
		lackOfDrive: null,
		lossOfInterest: null,
		moodSwings: null,
		overwhelmed: null,
		sleepProblems: null,
		tense: null,
	};
	const onChange = vi.fn().mockResolvedValue(undefined);
	const labels = [
		"Schlaf",
		"Morgens",
		"Abends",
		"Depressive Verstimmung, selbstabwertende Gedanken",
		"Anspannung, Ängstlichkeit oder Gefühl des Aufgedrehtseins",
		"Stimmungsschwankungen, gesteigerte Empfindlichkeit",
		"Reizbarkeit, Wut, Ärger, vermehrte Konflikte",
		"Interessenlosigkeit für übliche Aktivitäten",
		"Konzentrationsschwierigkeiten",
		"Leichte Ermüdbarkeit, Energieverlust, Antriebsmangel",
		"Appetitveränderungen, Verlangen nach speziellen Lebensmitteln",
		"Schlafstörung (zu viel, zu wenig, unruhig, etc.)",
		"Gefühl, die Kontrolle zu verlieren; Gefühl des Überwältigtseins",
	];

	beforeEach(() => vi.resetAllMocks());
	afterEach(() => {
		vi.useRealTimers();
	});

	it("Renders", () => {
		render(<StatusSliders status={testStatus} onChange={onChange} />);

		labels.forEach((label) => {
			screen.getByText(label);
		});
		const sliders = screen.getAllByRole("slider");
		expect(sliders).toHaveLength(13);
	});

	it("Changes are debounced correctly", async () => {
		vi.useFakeTimers();
		render(<StatusSliders status={testStatus} onChange={onChange} />);

		const sliders = screen.getAllByRole("slider");
		await act(async () => {
			fireEvent.change(sliders[0], { target: { value: 2 } });
			vi.advanceTimersByTime(100);
			fireEvent.change(sliders[1], { target: { value: 1 } });
		});
		expect(onChange).not.toHaveBeenCalled();
		await act(async () => vi.advanceTimersByTime(debounceTimeout));
		expect(onChange).toHaveBeenCalledExactlyOnceWith(1, {
			date: dayjs(new Date("2022-11-12")),
			eveningFitness: 3,
			morningFitness: 1,
			morningSleep: 2,
			statusId: 1,
			appetiteChanges: null,
			concentrationProblems: null,
			depressive: null,
			irritable: null,
			lackOfDrive: null,
			lossOfInterest: null,
			moodSwings: null,
			overwhelmed: null,
			sleepProblems: null,
			tense: null,
		});
	});

	it("Loading is displayed", async () => {
		vi.useFakeTimers();
		const pendingOnChange = vi
			.fn()
			.mockResolvedValue(
				() => new Promise((resolve) => setTimeout(resolve, 50)),
			);

		render(<StatusSliders status={testStatus} onChange={pendingOnChange} />);

		const sliders = screen.getAllByRole("slider");
		await act(async () => {
			fireEvent.change(sliders[0], { target: { value: 2 } });
			vi.advanceTimersByTime(debounceTimeout);
		});

		screen.getByTestId("loading-spinner");
		await act(async () => vi.advanceTimersByTime(50));
		expect(screen.queryByTestId("loading-spinner")).not.toBeVisible();
	});

	it.skip("Color mapping works as expected", () => {});
});
