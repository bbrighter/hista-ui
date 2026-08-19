import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createMeal, createMealList } from "@/__tests__/fixtures/meal";
import { getMealListHandler } from "@/__tests__/mocks/mealHandlers";
import { server } from "@/__tests__/setupTest";
import useHista from "@/store/store";
import Meals from "../Meals";

describe("meal list items", () => {
	const findDeleteButton = () => screen.findByTestId("delete-button");
	const getSetNowButton = () => screen.getByTestId("set-now-button");
	beforeEach(() => {
		useHista.getState().resetMeals();
	});

	it("everything is rendered", async () => {
		server.use(
			getMealListHandler(createMealList([createMeal({ date: "2024-01-01" })])),
		);
		render(
			<MemoryRouter>
				<Meals />
			</MemoryRouter>,
		);

		expect(await screen.findByTestId("add-meal-button")).toBeInTheDocument();
		expect(await screen.findByText("01.01.2024 00:00")).toBeInTheDocument();
		expect(await findDeleteButton()).toBeInTheDocument();
		expect(getSetNowButton()).toBeInTheDocument();
	});

	it("deletion works", async () => {
		server.use(
			getMealListHandler(createMealList([createMeal({ date: "2024-01-01" })])),
		);
		render(
			<MemoryRouter>
				<Meals />
			</MemoryRouter>,
		);

		const deleteButton = await findDeleteButton();
		await userEvent.click(deleteButton);
		const modal = screen.getByRole("dialog");
		expect(modal).toBeInTheDocument();
		const confirmDeleteButton = within(modal).getByRole("button", {
			name: "Löschen",
		});
		await userEvent.click(confirmDeleteButton);
		expect(screen.queryByText("01.01.2024 01:00")).not.toBeInTheDocument();
	});

	it("set date to now", async () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2020-12-15T12:00:00"));
		render(
			<MemoryRouter>
				<Meals />
			</MemoryRouter>,
		);

		const setNowButton = await waitFor(() => {
			vi.advanceTimersByTimeAsync(1000);
			return getSetNowButton();
		});
		await userEvent.click(setNowButton);

		await waitFor(() => {
			vi.advanceTimersByTimeAsync(1000);
			expect(screen.getByText("15.12.2020 12:00")).toBeInTheDocument();
		});

		vi.useRealTimers();
	});

	// This should not be tested here, should it?
	it.skip("navigation to managament", async () => {
		render(
			<MemoryRouter initialEntries={["/123/meals"]}>
				<Routes>
					<Route path="/:piid/meals" element={<Meals />} />
					<Route
						path="/:piid/manage-ingredients"
						element={<>Management scene</>}
					/>
				</Routes>
			</MemoryRouter>,
		);

		const manageButton = await screen.findByTestId("manage-ingredients-button");
		expect(manageButton).toBeInTheDocument();
		await userEvent.click(manageButton);
		expect(screen.getByText("Management scene")).toBeInTheDocument();
	});
});

describe("header actions", () => {
	it("adding a meal navigates to it", async () => {
		render(
			<MemoryRouter initialEntries={["/123/meals"]}>
				<Routes>
					<Route path="/:piid/meals" element={<Meals />} />
					<Route
						path="/:piid/manage-ingredients"
						element={<>Management scene</>}
					/>
					<Route path="/:piid/meals/:id" element={<>Meal scene</>} />
				</Routes>
			</MemoryRouter>,
		);

		const addMealButton = await screen.findByTestId("add-meal-button");
		await userEvent.click(addMealButton);

		expect(screen.getByText("Meal scene")).toBeInTheDocument();
	});

	it("navigate to management", async () => {
		render(
			<MemoryRouter initialEntries={["/123/meals"]}>
				<Routes>
					<Route path="/:piid/meals" element={<Meals />} />
					<Route
						path="/:piid/manage-ingredients"
						element={<>Management scene</>}
					/>
					<Route path="/:piid/meals/:id" element={<>Meal scene</>} />
				</Routes>
			</MemoryRouter>,
		);

		const managementButton = await screen.findByTestId(
			"manage-ingredients-button",
		);
		await userEvent.click(managementButton);

		expect(screen.getByText("Management scene")).toBeInTheDocument();
	});
});
