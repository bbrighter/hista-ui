import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHeadache } from "@/__tests__/fixtures/headache";
import { getHeadacheHandler } from "@/__tests__/mocks/headacheHandlers";
import useHista from "@/store/store";
import { server } from "../../../__tests__/setupTest";
import { actions } from "../../../actions";
import Headache from "../Headache";
import {
	getDescriptionTextBox,
	getSeveritySlider,
	getTagByName,
	isTagActive,
} from "./selectors";

describe("A headache can be edited and displayed", () => {
	const patchHeadacheSeverity = vi.spyOn(actions.headaches, "patchSeverity");
	const patchHeadachePositions = vi.spyOn(actions.headaches, "patchPositions");
	const patchHeadacheTypes = vi.spyOn(actions.headaches, "patchTypes");
	const patchHeadacheSymptoms = vi.spyOn(actions.headaches, "patchSymptoms");
	const patchHeadacheDescription = vi.spyOn(
		actions.headaches,
		"patchDescription",
	);

	beforeEach(() => {
		const store = useHista.getState();
		store.resetLoaded();
		store.resetHeadaches();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	const renderHeadache = () =>
		render(
			<MemoryRouter
				initialEntries={["/7b3047c2-d56d-4942-abc4-39eb85e785f2/headaches/1"]}
			>
				<Routes>
					<Route path="/:piid/headaches/:headacheId" element={<Headache />} />
				</Routes>
			</MemoryRouter>,
		);

	it("Renders everything", async () => {
		server.use(
			getHeadacheHandler(
				createHeadache({
					id: 1,
					severity: 3,
					date: "2024-03-12T12:00:00Z",
					description: "Description",
					positions: ["left"],
					types: ["stabbing"],
					symptoms: ["nausea"],
				}),
			),
		);
		renderHeadache();

		await screen.findByText("2024"); // TODO: Check the whole date

		const slider = getSeveritySlider();
		expect(slider).toHaveValue("3");

		const positions = [
			"Links",
			"Rechts",
			"Oben",
			"Vorne",
			"Hinterkopf",
			"Seite",
			"Schläfe",
			"Stirn",
			"Ohr",
			"Nacken",
			"Auge",
			"Gesicht",
		];
		const types = ["Pulsierend-pochend", "Dumpf-drückend", "Stechend"];
		const symptoms = [
			"Kurzzeitgedächtnis",
			"Tinnitus",
			"Lichtempfindlichkeit",
			"Lärmempfindlichkeit",
			"Geruchsempfindlichkeit",
			"Schwindel",
			"Konzentrationsstörung",
			"Müdigkeit",
			"Erschöpfung",
			"Übelkeit",
			"Keine körperliche Aktivität",
			"Verstärkt durch körperliche Aktivität",
			"Verstärkt durch geistige Aktivität",
		];
		const tags = [...positions, ...types, ...symptoms];
		tags.forEach((t) => {
			const tag = getTagByName(t);
			["Links", "Übelkeit", "Stechend"].includes(t)
				? expect(isTagActive(tag)).toBe(true)
				: expect(isTagActive(tag)).toBe(false);
		});

		expect(
			screen
				.queryAllByRole("button")
				.filter((b) => b.classList.contains("MuiChip-root")),
		).toHaveLength(tags.length);

		const textbox = getDescriptionTextBox();
		await waitFor(() => {
			expect(textbox).toHaveValue("Description");
		});
	});

	it("Change positions, symptoms and types", async () => {
		server.use(
			getHeadacheHandler(
				createHeadache({
					id: 1,
					severity: 3,
					date: "2024-03-12T12:00:00Z",
					description: "Description",
					positions: ["left"],
					types: ["stabbing"],
					symptoms: [],
				}),
			),
		);
		renderHeadache();

		const rightPosition = getTagByName("Rechts");
		await userEvent.click(rightPosition);
		expect(patchHeadachePositions).toHaveBeenCalledOnce();

		const stabbingType = getTagByName("Stechend");
		await userEvent.click(stabbingType);
		expect(patchHeadacheTypes).toHaveBeenCalledOnce();

		const nauseaSymptom = getTagByName("Übelkeit");
		await userEvent.click(nauseaSymptom);
		expect(patchHeadacheSymptoms).toHaveBeenCalledOnce();
	});

	it("Change severity", async () => {
		const sliderDebounceTime = 300;
		vi.useFakeTimers();
		server.use(getHeadacheHandler(createHeadache({ id: 1, severity: 3 })));
		renderHeadache();

		await act(async () => vi.runAllTimersAsync());

		const slider = getSeveritySlider();
		expect(slider).toHaveValue("3");
		fireEvent.change(slider, { target: { value: 1 } });
		expect(patchHeadacheSeverity).not.toHaveBeenCalled();

		await act(async () => vi.advanceTimersByTime(sliderDebounceTime));
		expect(patchHeadacheSeverity).toHaveBeenCalledOnce();

		// Setting to 1 again does not trigger a new event
		fireEvent.change(slider, { target: { value: 3 } });
		await act(async () => vi.advanceTimersByTime(sliderDebounceTime / 2));
		fireEvent.change(slider, { target: { value: 1 } });
		await act(async () => vi.advanceTimersByTime(sliderDebounceTime));
		expect(patchHeadacheSeverity).toHaveBeenCalledOnce();
	});

	it("Change description", async () => {
		const textboxDebounceTime = 1000;
		vi.useFakeTimers();

		server.use(
			getHeadacheHandler(createHeadache({ id: 1, description: "Description" })),
		);
		renderHeadache();
		await act(async () => vi.runAllTimersAsync());

		const textbox = getDescriptionTextBox();
		expect(textbox).toHaveValue("Description");
		fireEvent.change(textbox, { target: { value: "New description" } });
		expect(textbox).toHaveValue("New description");
		expect(patchHeadacheDescription).not.toHaveBeenCalled();
		await act(async () => vi.advanceTimersByTime(textboxDebounceTime));
		expect(patchHeadacheDescription).toHaveBeenCalledOnce();
		expect(textbox).toHaveValue("New description");
	});

	it.skip("Change the date", async () => {});

	it("Show loading indicator", async () => {
		vi.useFakeTimers();
		server.use(getHeadacheHandler({}, 100));
		renderHeadache();

		expect(screen.getByTestId("loading-spinner")).toBeVisible();

		await act(async () => vi.advanceTimersByTimeAsync(100));

		expect(screen.getByTestId("loading-spinner")).not.toBeVisible();
	});
});
