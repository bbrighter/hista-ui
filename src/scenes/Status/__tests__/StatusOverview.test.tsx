import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createStatus, createStatusList } from "@/__tests__/fixtures/status";
import {
	getStatusListDelayedHandler,
	getStatusListHandler,
} from "@/__tests__/mocks/statusHandler";
import { server } from "@/__tests__/setupTest";
import useHista from "@/store/store";
import { StatusOverview } from "../StatusOverview";

vi.mock("@hooks/useAppNavigate");

describe("StatusOverview integration", () => {
	const renderStatus = () =>
		render(
			<MemoryRouter>
				<StatusOverview />
			</MemoryRouter>,
		);

	beforeEach(() => {
		useHista.getState().resetStatuses();
	});

	afterEach(() => vi.useRealTimers());

	it("Renders and tab change", async () => {
		server.use(
			getStatusListHandler(
				createStatusList(createStatus({ id: 1, date: "2024-03-12" })),
			),
		);
		renderStatus();

		const row = (await screen.findByText("12.03.2024 00:00")).closest("li");
		const statusTab = screen.getByRole("tab", {
			name: "Status",
			selected: true,
		});

		const evaluationTab = screen.getByRole("tab", {
			name: "Auswertung",
			selected: false,
		});
		await userEvent.click(evaluationTab);
		expect(row).not.toBeVisible();
		screen.getByLabelText("chart");
		expect(statusTab).toHaveAttribute("aria-selected", "false");
	});

	it("Loading", async () => {
		server.use(getStatusListDelayedHandler(50, createStatusList()));

		renderStatus();

		const loader = screen.getByTestId("loading-spinner");

		await waitFor(() => expect(loader).not.toBeVisible());
	});
});
