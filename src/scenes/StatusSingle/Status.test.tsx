import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { client } from "@/api/api";
import Status from "./Status";

describe("Status integration test", () => {
	const spyPatch = vi.spyOn(client, "PatchStatus");
	const spyGet = vi.spyOn(client, "ListStatus");

	afterEach(() => {
		vi.useRealTimers();
	});

	it("Renders", { timeout: 1000 }, async () => {
		vi.useFakeTimers();
		render(
			<MemoryRouter initialEntries={["/status/1"]}>
				<Routes>
					<Route path="/status/:id" element={<Status />} />
				</Routes>
			</MemoryRouter>,
		);

		await act(async () => vi.runAllTimers());

		screen.getByText("Mo, 01.01.2024");
		expect(spyGet).toHaveBeenCalled();
		const sliders = screen.getAllByRole("slider");
		expect(sliders).toHaveLength(13);
		const slider1 = sliders[0];

		await act(async () => {
			fireEvent.change(slider1, { target: { value: 1 } });
			expect(spyPatch).not.toHaveBeenCalled();
			vi.advanceTimersByTime(1000);
		});
		expect(spyPatch).toHaveBeenCalled();
	});
});
