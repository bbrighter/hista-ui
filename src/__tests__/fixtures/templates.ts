import type { hista } from "@/api/generatedApi";

export const createTemplate = (
	overrides: Partial<hista.TemplateResponse> = {},
): hista.TemplateResponse => ({
	id: 1,
	name: "Template",
	items: [
		{
			item: 1,
			condition: "raw",
			ingredientId: 1,
		},
	],
	...overrides,
});

export const createTemplates = (
	replaces: Array<hista.TemplateResponse> | hista.TemplateResponse = [],
): hista.TemplateListResponse => ({
	templates: Array.isArray(replaces) ? replaces : [replaces],
});
