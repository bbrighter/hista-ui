import type { hista } from "../../api/generatedApi";
import type { MuiSliderColor } from "../../types";

interface Condition {
	id: number;
	symptomId: number;
	severity: number;
}

export const respToCondition = (resp: hista.ConditionResponse): Condition => ({
	id: resp.id,
	symptomId: resp.symptomId,
	severity: resp.severity,
});

export const colorFromSeverity = (
	severity: number | Array<number>,
): MuiSliderColor => {
	let sev = severity;
	if (Array.isArray(severity)) {
		sev = Math.max(...severity);
	}
	switch (sev) {
		case 1:
			return "success";
		case 2:
			return "primary";
		case 3:
			return "secondary";
		case 4:
			return "warning";
		case 5:
			return "error";
		default:
			return "info";
	}
};
