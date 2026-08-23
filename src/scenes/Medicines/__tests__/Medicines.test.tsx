import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
	createIntakeList,
	createMedicineList,
} from "@/__tests__/fixtures/medicines";
import {
	getIntakeListHandler,
	getMedicineListHandler,
} from "@/__tests__/mocks/medicineHandlers";
import { server } from "@/__tests__/setupTest";
import { Medicines } from "../Medicines";
import { getIntakeRows, getTodaysRow } from "./selectors";

const mocks = vi.hoisted(() => ({
	navigate: {
		to: {
			manageMedicine: vi.fn(),
		},
	},
}));

vi.mock("@/hooks/useNavigate", () => ({
	useAppNavigate: () => mocks.navigate,
}));

describe("Medicines", () => {
	afterEach(() => vi.useRealTimers());

	it("Render", async () => {
		vi.useFakeTimers();
		vi.setSystemTime("2022-03-15T12:00:00Z");
		server.use(
			getMedicineListHandler(createMedicineList({ id: 1, name: "Medicine" })),
			getIntakeListHandler(
				createIntakeList([
					{
						medicineId: 1,
						count: 0,
						date: "2022-03-12T00:00:00Z",
					},
					{
						medicineId: 1,
						count: 6,
						date: "2022-03-13T00:00:00Z",
					},
					{
						medicineId: 1,
						count: 5,
						date: "2022-03-14T00:00:00Z",
					},
					{
						medicineId: 1,
						count: 4,
						date: "2022-03-15T00:00:00Z",
					},
				]),
			),
		);
		render(
			<MemoryRouter>
				<Medicines />
			</MemoryRouter>,
		);

		await act(async () => await vi.runOnlyPendingTimersAsync());

		const manageButton = screen.getByRole("button", {
			name: "Medikamente verwalten",
		});
		expect(manageButton).toBeInTheDocument();

		const rows = getIntakeRows("Medicine");
		expect(rows).toHaveLength(4);

		const expectedCounts = [4, 5, 6, 0];
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
			<MemoryRouter>
				<Medicines />
			</MemoryRouter>,
		);

		const manageButton = await screen.findByRole("button", {
			name: "Medikamente verwalten",
		});
		expect(manageButton).toBeInTheDocument();
		await userEvent.click(manageButton);

		expect(mocks.navigate.to.manageMedicine).toHaveBeenCalled();
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
		expect(decreaseButton).toBeDisabled();

		await userEvent.click(increaseButton);
		expect(within(todaysRow).getByText(1)).toBeInTheDocument();

		await userEvent.click(decreaseButton);
		expect(within(todaysRow).getByText(0)).toBeInTheDocument();
	});

	it("Archived medicine not visible", async () => {
		server.use(
			getMedicineListHandler(
				createMedicineList({ name: "Archived medicine", isArchived: true }),
			),
		);
		render(
			<MemoryRouter>
				<Medicines />
			</MemoryRouter>,
		);

		expect(
			await waitFor(() => screen.queryByText("Archived medicine")),
		).not.toBeInTheDocument();
	});
});
