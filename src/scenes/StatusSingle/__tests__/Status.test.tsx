import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PIID } from "@/__tests__/fixtures/piid";
import { createStatusList } from "@/__tests__/fixtures/status";
import { getStatusListHandler } from "@/__tests__/mocks/statusHandler";
import { server } from "@/__tests__/setupTest";
import { client } from "@/api/api";
import useHista from "@/store/store";
import Status from "../Status";

describe("Status integration test", () => {
	const spyPatch = vi.spyOn(client, "PatchStatus");
	const spyGet = vi.spyOn(client, "ListStatus");

	afterEach(() => {
		vi.useRealTimers();
	});

	beforeEach(() => {
		useHista.getState().resetStatuses();
	});

	const debounceTimeout = 1000;

	it("Renders", async () => {
		server.use(
			getStatusListHandler(
				createStatusList({
					date: "2024-01-01T00:00:00Z",
					id: 1,
					morningSleep: 2,
				}),
			),
		);
		render(
			<MemoryRouter initialEntries={["/status/1"]}>
				<Routes>
					<Route path="/status/:id" element={<Status />} />
				</Routes>
			</MemoryRouter>,
		);

		await screen.findByText("Mo, 01.01.2024");
		expect(spyGet).toHaveBeenCalled();
		const sliders = screen.getAllByRole("slider");
		expect(sliders).toHaveLength(14);
	});

	it("Slider and checkbox changes can be applied", async () => {
		vi.useFakeTimers();

		server.use(
			getStatusListHandler(createStatusList({ id: 1, morningSleep: 1 })),
		);

		render(
			<MemoryRouter initialEntries={["/status/1"]}>
				<Routes>
					<Route path="/status/:id" element={<Status />} />
				</Routes>
			</MemoryRouter>,
		);

		await act(async () => vi.runAllTimers());

		const sliders = screen.getAllByRole("slider");
		const slider1 = sliders[0];

		expect(screen.queryAllByTestId("dirty-status-icon")).toHaveLength(0);
		await act(async () => {
			fireEvent.change(slider1, { target: { value: 2 } });
			expect(spyPatch).not.toHaveBeenCalled();
		});

		expect(screen.queryAllByTestId("dirty-status-icon")).toHaveLength(1);

		await act(async () => vi.advanceTimersByTime(debounceTimeout / 2));

		expect(screen.queryAllByTestId("dirty-status-icon")).toHaveLength(1);

		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);

		await act(async () => vi.advanceTimersByTime(debounceTimeout));

		expect(screen.queryAllByTestId("dirty-status-icon")).toHaveLength(0);

		expect(spyPatch).toHaveBeenCalledExactlyOnceWith(PIID, 1, {
			appetiteChanges: null,
			concentrationProblems: null,
			date: "2024-01-01T00:00:00.000Z",
			depressive: null,
			eveningFitness: null,
			dayFitness: null,
			irritable: null,
			lackOfDrive: null,
			lossOfInterest: null,
			moodSwings: null,
			morningFitness: null,
			morningSleep: 2,
			overwhelmed: null,
			sleepProblems: null,
			tense: null,
			crash: true,
		});
	});
});
