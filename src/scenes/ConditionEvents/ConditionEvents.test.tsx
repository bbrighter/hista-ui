import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, HttpResponse, http } from "msw";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { server } from "../../__tests__/setupTest";
import ConditionEvents from "./ConditionEvents";

const findRowByDate = async (date: string): Promise<HTMLElement> => {
	return (await screen.findByText(new RegExp(date))).closest(
		"li",
	) as HTMLElement;
};

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
	const actual =
		await vi.importActual<typeof import("react-router-dom")>(
			"react-router-dom",
		);
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

describe("Manage condition events", () => {
	it("Events are rendered", async () => {
		render(
			<MemoryRouter>
				<ConditionEvents />
			</MemoryRouter>,
		);

		const row = await findRowByDate("01.01.2024");
		expect(row).toBeInTheDocument();
	});

	it("Event can be deleted", async () => {
		render(
			<MemoryRouter>
				<ConditionEvents />
			</MemoryRouter>,
		);

		const deleteButton = await screen.findByTestId("delete-button");
		expect(deleteButton).toBeInTheDocument();

		await userEvent.click(deleteButton);
		const modal = screen.getByRole("dialog");
		expect(modal).toBeInTheDocument();
		const confirmDeleteButton = within(modal).getByRole("button", {
			name: "Löschen",
		});
		await userEvent.click(confirmDeleteButton);
		expect(screen.queryByText(/01.01.2024/)).not.toBeInTheDocument();
	});

	//   it("Event can be set to now", async () => {
	//     render(<MemoryRouter><ConditionEvents /></MemoryRouter>)

	//     const setNowButton = await screen.findByTestId("set-now-button")
	//     expect(setNowButton).toBeInTheDocument()

	//     await userEvent.click(setNowButton)
	//     expect(screen.getByText(new Date().toLocaleDateString("de-DE"))).toBeInTheDocument()
	//   })

	it("Event can be created", async () => {
		render(
			<MemoryRouter>
				<ConditionEvents />
			</MemoryRouter>,
		);

		const createButton = await screen.findByText("Neues Symptom");
		expect(createButton).toBeInTheDocument();

		await userEvent.click(createButton);
		expect(mockNavigate).toHaveBeenCalledWith(
			"/7b3047c2-d56d-4942-abc4-39eb85e785f2/condition-events/2",
		);
	});

	it("Event can be opened", async () => {
		render(
			<MemoryRouter>
				<ConditionEvents />
			</MemoryRouter>,
		);

		const row = await findRowByDate("01.01.2024");

		await userEvent.click(row);
		expect(mockNavigate).toHaveBeenCalledWith(
			"/7b3047c2-d56d-4942-abc4-39eb85e785f2/condition-events/1",
		);
	});

	it("Symptom management can be opened", async () => {
		render(
			<MemoryRouter>
				<ConditionEvents />
			</MemoryRouter>,
		);

		const managementButton = await screen.findByTestId(
			"manage-symptoms-button",
		);
		expect(managementButton).toBeInTheDocument();

		await userEvent.click(managementButton);
		expect(mockNavigate).toHaveBeenCalledWith(
			"/7b3047c2-d56d-4942-abc4-39eb85e785f2/manage-symptoms",
		);
	});

	it("Show loading indicator", async () => {
		server.use(
			http.get(
				"http://localhost:4444/piid/:piid/condition-events",
				async () => {
					await delay(100);
					return HttpResponse.json({ conditionEvents: [] });
				},
			),
		);
		render(
			<MemoryRouter>
				<ConditionEvents />
			</MemoryRouter>,
		);

		expect(await screen.findByTestId("loading-spinner")).toBeVisible();

		await waitFor(() =>
			expect(screen.queryByTestId("loading-spinner")).not.toBeVisible(),
		);
	});
});
