import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, HttpResponse, http } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { server } from "../../__tests__/setupTest";
import ConditionEvent from "./ConditionEvent";

const renderConditionEvent = () => {
	render(
		<MemoryRouter initialEntries={["/condition-events/1"]}>
			<Routes>
				<Route path="/condition-events/:id" element={<ConditionEvent />} />
			</Routes>
		</MemoryRouter>,
	);
};

const getSlider = (symptomName: string): HTMLElement => {
	const symptom = screen.getByText(symptomName);
	const listItem = symptom.closest("li") as HTMLElement;
	expect(listItem).toBeInTheDocument();

	const input = within(listItem).getByRole("slider");
	return input;
};

const sliderHasColor = (
	symptomName: string,
	color: "Error" | "Secondary",
): boolean => {
	const symptom = screen.getByText(symptomName);
	const listItem = symptom.closest("li");
	expect(listItem).toBeInTheDocument();
	const button = listItem?.querySelector(".MuiSlider-root");
	expect(button).toBeInTheDocument();
	return button?.className.includes(color) ?? false;
};

describe("condition event is rendered and can be edited", () => {
	it("Existing symptoms are displayed", async () => {
		renderConditionEvent();

		const input = await waitFor(() => {
			return getSlider("symptom1");
		});
		expect(input).toHaveValue("3");
	});

	it("Change severity of symptom", async () => {
		renderConditionEvent();

		const input = await waitFor(() => {
			return getSlider("symptom1");
		});
		expect(input).toHaveValue("3");
		expect(sliderHasColor("symptom1", "Secondary")).toBeTruthy();

		await act(async () => fireEvent.change(input, { target: { value: 5 } }));
		expect(input).toHaveValue("5");
		expect(sliderHasColor("symptom1", "Error")).toBeTruthy();
	});

	it("Delete symptom", async () => {
		renderConditionEvent();

		const deleteButton = await screen.findByTitle("Löschen");
		expect(deleteButton).toBeInTheDocument();
		await userEvent.click(deleteButton);
		expect(screen.queryByTitle("Löschen")).not.toBeInTheDocument();
	});

	it("Add symptom", async () => {
		renderConditionEvent();

		const symptomInput = await screen.findByRole("combobox");
		expect(symptomInput).toBeInTheDocument();

		await userEvent.type(symptomInput, "symp");
		const selectableValue = screen.getByText("symptom2");
		expect(selectableValue).toBeInTheDocument();
		await userEvent.click(selectableValue);

		expect(getSlider("symptom2")).toBeInTheDocument();
		const newListItem = screen.getByTestId("condition-list-item-4"); // 4 is the ID of the new condition
		expect(newListItem).toBeInTheDocument();
		expect(newListItem).toHaveTextContent("symptom2");
	});

	it("Add new symptom", async () => {
		server.use(
			http.post("/piid/:piid/condition-events/:id/conditions", async () => {
				return HttpResponse.json({
					condition: { id: 4, severity: 1, symptomId: 3 },
					symptoms: {
						Categories: [
							{
								id: 1,
								name: "cat",
								symptoms: [
									{ id: 1, name: "symptom1", categoryId: 1 },
									{ id: 2, name: "symptom2", categoryId: 1 },
								],
							},
							{
								id: 2,
								name: "cat with no symptoms",
								symptoms: [{ id: 3, name: "new symptom", categoryId: 2 }],
							},
						],
					},
				});
			}),
		);
		renderConditionEvent();

		const symptomInput = await screen.findByRole("combobox");
		expect(symptomInput).toBeInTheDocument();
		await userEvent.type(symptomInput, "new symptom");
		await userEvent.keyboard("{Enter}");

		expect(screen.getByRole("presentation")).toBeVisible();
		const categoryInput = await screen.findByLabelText("Kategorie");
		expect(categoryInput).toBeInTheDocument();
		await userEvent.type(categoryInput, "cat with no symptom");
		await userEvent.keyboard("{ArrowDown}");
		await userEvent.keyboard("{Enter}");

		expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
		const conditionList = screen.getByRole("list");
		expect(within(conditionList).getByText("symptom1")).toBeInTheDocument();
		expect(within(conditionList).getByText("new symptom")).toBeInTheDocument();
	});

	it("Show loading indicator", async () => {
		server.use(
			http.get("/piid/:piid/condition-events/:id", async () => {
				await delay(100);
				return HttpResponse.json({
					id: 1,
					date: "2024-01-01T00:00:00Z",
					conditions: [{ id: 1, severity: 3, symptomId: 1 }],
				});
			}),
		);
		renderConditionEvent();

		expect(await screen.findByTestId("loading-spinner")).toBeVisible();

		await waitFor(() =>
			expect(screen.queryByTestId("loading-spinner")).not.toBeVisible(),
		);
	});
});
