import { beforeEach, describe, expect, it } from "vitest";

import useHista from "../store";

describe("symptom store", () => {
	beforeEach(() => {
		const { setSymptoms } = useHista.getState();
		setSymptoms([
			{
				categoryId: 1,
				categoryName: "cat1",
				symptoms: [
					{ categoryId: 1, id: 1, name: "sym1" },
					{ categoryId: 1, id: 2, name: "sym2" },
				],
			},
			{
				categoryId: 2,
				categoryName: "cat2",
				symptoms: [{ categoryId: 2, id: 3, name: "sym3" }],
			},
		]);
	});
	it("update symptom", () => {
		const { updateSymptom } = useHista.getState();

		updateSymptom(2, { name: "new sym 2" });

		const { symptoms } = useHista.getState();
		const sym2 = symptoms.flatMap((c) => c.symptoms).find((s) => s.id === 2);
		expect(sym2?.name).toBe("new sym 2");
	});

	it("update category", () => {
		const { updateCategory } = useHista.getState();

		const catId = 1;
		updateCategory(catId, { categoryName: "new cat 1" });

		const { symptoms } = useHista.getState();
		const cat = symptoms.find((c) => c.categoryId === catId);
		expect(cat?.categoryName).toBe("new cat 1");
	});
});
