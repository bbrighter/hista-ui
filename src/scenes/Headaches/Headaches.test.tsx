import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, HttpResponse, http } from "msw";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { server } from "../../__tests__/setupTest";
import Headaches from "./Headaches";

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

describe("Headache management", () => {
	it("Headaches and colors are rendered", async () => {
		render(
			<MemoryRouter>
				<Headaches />
			</MemoryRouter>,
		);

		const row = await findRowByDate("01.01.2022");
		expect(row).toBeInTheDocument();
		const severityCircle = within(row).getByTitle("Schwere");
		expect(severityCircle).toBeInTheDocument();
		expect(within(row).getByTestId("circle-icon")).toHaveStyle({
			color: "rgb(153,255,0)",
		});
	});

	it("Headache can be deleted", async () => {
		render(
			<MemoryRouter>
				<Headaches />
			</MemoryRouter>,
		);

		const row = await findRowByDate("01.01.2022");
		expect(row).toBeInTheDocument();
		const deleteButton = screen.getByTestId("delete-button");
		expect(deleteButton).toBeInTheDocument();

		await userEvent.click(deleteButton);
		const modal = screen.getByRole("dialog");
		expect(modal).toBeInTheDocument();
		const confirmDeleteButton = within(modal).getByRole("button", {
			name: "Löschen",
		});
		await userEvent.click(confirmDeleteButton);
		expect(screen.queryByText(/01.01.2022/)).not.toBeInTheDocument();
	});

	it("Headache can be created", async () => {
		render(
			<MemoryRouter>
				<Headaches />
			</MemoryRouter>,
		);

		const createButton = await screen.findByText("Neuer Kopfschmerz");
		expect(createButton).toBeInTheDocument();

		await userEvent.click(createButton);

		expect(mockNavigate).toHaveBeenCalledWith("2");
	});

	it("Clicking a row opens the headache", async () => {
		render(
			<MemoryRouter>
				<Headaches />
			</MemoryRouter>,
		);

		const row = await findRowByDate("01.01.2022");
		await userEvent.click(row);

		expect(mockNavigate).toHaveBeenCalledWith("1");
	});

	it("Show loading indicator", async () => {
		server.use(
			http.get("/piid/:piid/headaches", async () => {
				await delay(100);
				return HttpResponse.json({ headaches: [] });
			}),
		);
		render(
			<MemoryRouter>
				<Headaches />
			</MemoryRouter>,
		);

		expect(await screen.findByTestId("loading-spinner")).toBeVisible();

		await waitFor(() =>
			expect(screen.queryByTestId("loading-spinner")).not.toBeVisible(),
		);
	});
});
