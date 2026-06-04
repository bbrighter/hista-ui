import { beforeEach, describe, expect, it } from "vitest";

import useHista from "../store";

describe("condition event store", () => {
	beforeEach(() => {
		useHista.getState().setConditionEvent({
			id: 1,
			date: new Date(),
			conditions: [{ id: 2, severity: 2, symptomId: 3 }],
		});
	});

	it("update condition event", () => {
		const { updateConditionEvent } = useHista.getState();

		updateConditionEvent(1, { date: new Date("2022-10-25T12:00:00") });

		const { conditionEvent } = useHista.getState();
		expect(conditionEvent.date).toStrictEqual(new Date("2022-10-25T12:00:00"));
	});

	it("update condition event which doesn't exist", () => {
		const { updateConditionEvent } = useHista.getState();

		updateConditionEvent(10, { date: new Date("2022-10-25T12:00:00") });

		const { conditionEvent } = useHista.getState();
		expect(conditionEvent.date).not.toStrictEqual(
			new Date("2022-10-25T12:00:00"),
		);
	});

	it("update condition", () => {
		const { updateCondition } = useHista.getState();

		updateCondition(2, { severity: 3 });

		const { conditionEvent } = useHista.getState();
		expect(conditionEvent.conditions[0].severity).toBe(3);
	});

	it("update condition, not exists", () => {
		const { updateCondition } = useHista.getState();

		updateCondition(20, { severity: 3 });

		const { conditionEvent } = useHista.getState();
		expect(conditionEvent.conditions[0].severity).toBe(2);
	});
});
