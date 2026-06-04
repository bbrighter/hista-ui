import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { Medicines } from "./Medicines";

const queryIntakeRows = (name: string): Array<HTMLElement> => {
	const names = screen.getAllByText(name);
	return names.map((n) => n.closest("li")) as Array<HTMLElement>;
};

const getTodaysRow = (name: string): HTMLElement => {
	const rows = queryIntakeRows(name);
	return rows[0];
};

describe("Medicines", () => {
	it("Render", async () => {
		render(
			<MemoryRouter>
				<Medicines />
			</MemoryRouter>,
		);

		const manageButton = await screen.findByRole("button", {
			name: "Medikamente verwalten",
		});
		expect(manageButton).toBeInTheDocument();

		const rows = queryIntakeRows("Medicine");
		expect(rows).toHaveLength(4);

		const expectedCounts = [0, 6, 5, 4];
		rows.forEach((r, i) => {
			expect(within(r).getByText(expectedCounts[i]));
			if (i === 0) {
				expect(within(r).getByTestId("increaseButton")).toBeInTheDocument();
			} else {
				expect(
					within(r).queryByTestId("increaseButton"),
				).not.toBeInTheDocument();
			}
		});
	});

	it("Manage button works", async () => {
		render(
			<MemoryRouter initialEntries={["/123/medicines"]}>
				<Routes>
					<Route path="/:piid/medicines" element={<Medicines />} />
					<Route
						path="/:piid/manage-medicines"
						element={<>Management scene</>}
					/>
				</Routes>
			</MemoryRouter>,
		);

		const manageButton = await screen.findByRole("button", {
			name: "Medikamente verwalten",
		});
		expect(manageButton).toBeInTheDocument();
		await userEvent.click(manageButton);

		expect(screen.getByText("Management scene")).toBeInTheDocument();
	});

	it("Increase/decrease works", async () => {
		render(
			<MemoryRouter>
				<Medicines />
			</MemoryRouter>,
		);

		const todaysRow = await waitFor(() => getTodaysRow("Medicine"));
		expect(todaysRow).toBeInTheDocument();
		expect(within(todaysRow).getByText(0)).toBeInTheDocument();

		const increaseButton = within(todaysRow).getByTestId("increaseButton");
		expect(increaseButton).toBeInTheDocument();

		const decreaseButton = within(todaysRow).getByTestId("decreaseButton");
		expect(decreaseButton).toBeInTheDocument();
		expect(decreaseButton).toBeDisabled();

		await userEvent.click(increaseButton);
		expect(within(todaysRow).getByText(1)).toBeInTheDocument();

		await userEvent.click(decreaseButton);
		expect(within(todaysRow).getByText(0)).toBeInTheDocument();
	});

	it("Archived medicine not visible", async () => {
		render(
			<MemoryRouter>
				<Medicines />
			</MemoryRouter>,
		);

		expect(
			await waitFor(() => screen.queryByText("Archived medicne")),
		).not.toBeInTheDocument();
	});
});
