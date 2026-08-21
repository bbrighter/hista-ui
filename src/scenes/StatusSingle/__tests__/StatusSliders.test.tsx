import { act, fireEvent, render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Status } from "@/store";
import { StatusSliders } from "../StatusSliders/StatusSliders";

describe("StatusSliders component", () => {
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
		crash: false,
		dayFitness: null,
	};
	const setSymptoms = vi.fn();
	const isDirty = vi.fn();
	const labels = [
		"Schlaf",
		"Morgens",
		"Tagsüber",
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
		render(
			<StatusSliders
				symptoms={testStatus}
				setSymptoms={setSymptoms}
				isDirty={isDirty}
			/>,
		);

		labels.forEach((label) => {
			screen.getByText(label);
		});
		const sliders = screen.getAllByRole("slider");
		expect(sliders).toHaveLength(14);
	});

	it("Changes are applied", async () => {
		render(
			<StatusSliders
				symptoms={testStatus}
				setSymptoms={setSymptoms}
				isDirty={isDirty}
			/>,
		);

		const sliders = screen.getAllByRole("slider");
		await act(async () => {
			fireEvent.change(sliders[0], { target: { value: 2 } });
		});
		expect(setSymptoms).toHaveBeenCalledExactlyOnceWith({
			...testStatus,
			morningSleep: 2,
		});
	});

	it("If dirty, loading is shown", async () => {
		const isDirtyMorningSleep = vi.fn((key) => key === "morningSleep");
		render(
			<StatusSliders
				symptoms={testStatus}
				setSymptoms={setSymptoms}
				isDirty={isDirtyMorningSleep}
			/>,
		);

		expect(screen.queryAllByTestId("dirty-status-icon")).toHaveLength(1);
	});
});
