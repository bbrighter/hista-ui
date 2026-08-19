import { describe, expect, it } from "vitest";
import { getTemplateListHandler } from "@/__tests__/mocks/templateHander";
import { server } from "@/__tests__/setupTest";
import useHista from "../../store/store";
import { actions } from "..";

describe("templates service", () => {
	it("List templates", async () => {
		server.use(
			getTemplateListHandler({
				id: 1,
				name: "Template",
				items: [{ condition: "raw", ingredientId: 20, item: 10 }],
			}),
		);
		await actions.templates.list();

		const { templates, loaded } = useHista.getState();
		expect(loaded.templates).toBeTruthy();
		expect(templates[1]).toBeDefined();
		expect(templates[1].name).toBe("Template");
		expect(templates[1].items).toHaveLength(1);
		expect(templates[1].items[0]).toMatchObject({
			condition: "raw",
			ingredientId: 20,
		});
	});

	it("Add template", async () => {
		await actions.templates.add("new name", [
			{ ingredientId: 2, condition: "cooked" },
		]);

		const { templates } = useHista.getState();
		expect(templates[2]).toBeDefined();
		expect(templates[2].name).toBe("new name");
		expect(templates[2].items).toHaveLength(1);
		expect(templates[2].items[0].ingredientId).toBe(2);
		expect(templates[2].items[0].condition).toBe("cooked");
	});

	it("Remove template", async () => {
		await actions.templates.list();
		await actions.templates.delete(1);

		const { templates } = useHista.getState();
		expect(templates[1]).not.toBeDefined();
	});

	it("Update template", async () => {
		server.use(getTemplateListHandler({ id: 1, name: "old name", items: [] }));
		await actions.templates.list();

		await actions.templates.change(1, "new name", [
			{ condition: "cooked", ingredientId: 1 },
			{ condition: "raw", ingredientId: 4 },
		]);

		const { templates } = useHista.getState();
		expect(templates[1].name).toBe("new name");
		expect(templates[1].items).toHaveLength(2);
		expect(templates[1].items[0]).toStrictEqual({
			condition: "cooked",
			ingredientId: 1,
		});
		expect(templates[1].items[1]).toStrictEqual({
			condition: "raw",
			ingredientId: 4,
		});
	});
});
