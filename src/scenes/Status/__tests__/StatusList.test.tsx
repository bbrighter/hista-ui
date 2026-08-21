import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import { describe, expect, it, vi } from "vitest";
import { StatusList } from "../List/StatusList";

const onNavigate = vi.fn();

describe("StatusList component", () => {
	it("Item checked if all entries are set", () => {
		render(
			<StatusList
				onNavigate={onNavigate}
				isLoading={false}
				statuses={[
					{
						appetiteChanges: 1,
						concentrationProblems: 1,
						date: dayjs(new Date()),
						depressive: 2,
						eveningFitness: 4,
						id: 1,
						irritable: 2,
						lackOfDrive: 1,
						lossOfInterest: 2,
						moodSwings: 3,
						morningFitness: 4,
						morningSleep: 2,
						overwhelmed: 1,
						sleepProblems: 3,
						tense: 4,
						crash: false,
						dayFitness: 1,
					},
				]}
			/>,
		);

		screen.getByTestId("DoneAllIcon");
	});

	it("Item not checked if not all entries are set", () => {
		render(
			<StatusList
				onNavigate={onNavigate}
				isLoading={false}
				statuses={[
					{
						appetiteChanges: 1,
						concentrationProblems: 1,
						date: dayjs(new Date()),
						depressive: 2,
						eveningFitness: 4,
						id: 1,
						irritable: null,
						lackOfDrive: 1,
						lossOfInterest: 2,
						moodSwings: 3,
						morningFitness: 4,
						morningSleep: 2,
						overwhelmed: 1,
						sleepProblems: 3,
						tense: 4,
						crash: false,
						dayFitness: 1,
					},
				]}
			/>,
		);

		expect(screen.queryByTestId("DoneAllIcon")).toBeNull();
	});
});
