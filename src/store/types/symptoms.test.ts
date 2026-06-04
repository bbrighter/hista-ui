import { describe, expect, it } from "vitest";

import type { hista } from "../../api/generatedApi";
import { respToSymptoms } from "./symptom.types";

describe("symptom", () => {
	const resp: hista.SymptomCategoryListResponse = {
		Categories: [{ id: 1, name: "Cat", symptoms: [] }],
	};
	it("test", () => {
		const cats = respToSymptoms(resp);
		expect(cats).toHaveLength(1);
	});
});
