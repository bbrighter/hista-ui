import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createMedicineList } from "@/__tests__/fixtures/medicines";
import { getMedicineListHandler } from "@/__tests__/mocks/medicineHandlers";
import useHista from "@/store/store";
import { server } from "../../../__tests__/setupTest";
import { MedicineManagement } from "../MedicineManagement";
import {
	getAddButton,
	getArchiveButton,
	getEditButton,
	getMedicineListItem,
	getSaveButton,
} from "./selectors";

const isUnarchiveButton = (button: HTMLElement): boolean => {
	const archiveIcon = button.querySelector("svg") as SVGSVGElement;
	return archiveIcon.classList.contains("MuiSvgIcon-colorDisabled");
};

describe("Medicine Management", () => {
	beforeEach(() => {
		const store = useHista.getState();
		store.resetMedicines();
		store.resetLoaded();
	});

	afterEach(() => vi.useRealTimers());

	it("Renders", async () => {
		server.use(
			getMedicineListHandler(
				createMedicineList([
					{ id: 1, name: "Medicine", isArchived: false, sortOrder: 1 },
					{ id: 2, name: "Archived medicine", isArchived: true, sortOrder: 2 },
				]),
			),
		);
		render(
			<MemoryRouter>
				<MedicineManagement />
			</MemoryRouter>,
		);

		await waitFor(() => getAddButton());
		getMedicineListItem("Medicine");
		getMedicineListItem("Archived medicine");
	});

	it("Archive medicine", async () => {
		server.use(
			getMedicineListHandler(
				createMedicineList({ isArchived: true, name: "Archived medicine" }),
			),
		);
		render(
			<MemoryRouter>
				<MedicineManagement />
			</MemoryRouter>,
		);

		const row = await waitFor(() => getMedicineListItem("Archived medicine"));

		const archiveButton = getArchiveButton(row);
		expect(isUnarchiveButton(archiveButton)).toBe(true);

		await userEvent.click(archiveButton);
		expect(isUnarchiveButton(getArchiveButton(row))).toBe(false);
	});

	it("Rename medicine", async () => {
		server.use(
			getMedicineListHandler(
				createMedicineList([
					{ name: "Medicine", id: 1, isArchived: false, sortOrder: 1 },
					{ name: "Other medicine", id: 2, isArchived: false, sortOrder: 2 },
				]),
			),
		);
		render(
			<MemoryRouter>
				<MedicineManagement />
			</MemoryRouter>,
		);

		const medicineRow = await waitFor(() => getMedicineListItem("Medicine"));
		const editButton = getEditButton(medicineRow);
		await userEvent.click(editButton);

		const saveButton = getSaveButton();
		expect(saveButton).toBeDisabled();
		const inputField = screen.getByRole("textbox", { name: "Medikament" });

		await userEvent.clear(inputField);
		expect(saveButton).toBeDisabled();
		await userEvent.type(inputField, "Other medicine");
		expect(saveButton).toBeDisabled();

		await userEvent.clear(inputField);
		await userEvent.type(inputField, "new name");
		expect(saveButton).not.toBeDisabled();

		await userEvent.click(saveButton);
		getMedicineListItem("new name");
	});

	it("no data, show no pills", async () => {
		server.use(getMedicineListHandler(createMedicineList([])));

		render(
			<MemoryRouter>
				<MedicineManagement />
			</MemoryRouter>,
		);

		expect(
			await screen.findByRole("button", { name: "Medikament hinzufügen" }),
		).toBeInTheDocument();
		expect(screen.getByRole("img")).toBeInTheDocument();
	});

	it("Reorder", { skip: true }, async () => {
		// Skipped, because it probably needs to be an e2e test
	});

	it("Loading", async () => {
		vi.useFakeTimers();
		server.use(getMedicineListHandler(createMedicineList([]), 100));
		render(
			<MemoryRouter>
				<MedicineManagement />
			</MemoryRouter>,
		);

		await act(async () => vi.runOnlyPendingTimers());
		expect(screen.getByTestId("loading-spinner")).toBeVisible();
		await act(async () => vi.advanceTimersByTime(100));
		expect(screen.getByTestId("loading-spinner")).not.toBeVisible();
	});
});
