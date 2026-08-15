import { client } from "../api/api";
import { repoToTemplates, type TemplateItem } from "../store";
import useHista from "../store/store";

export const templates = {
	list: async () => {
		const { setTemplates, setLoaded, loaded } = useHista.getState();
		if (loaded.templates) return;

		const resp = await client.ListTemplates();
		const templates = repoToTemplates(resp);
		setTemplates(templates);
		setLoaded("templates");
	},

	add: async (name: string, items: Array<TemplateItem>) => {
		const { addTemplate } = useHista.getState();

		const resp = await client.PostTemplate({ name: name, items: items });
		addTemplate(resp.id, { items: items, name: name });
	},

	delete: async (id: number) => {
		const { removeTemplate } = useHista.getState();

		await client.DeleteTemplate(id);
		removeTemplate(id);
	},

	change: async (id: number, name: string, items: Array<TemplateItem>) => {
		const { updateTemplate } = useHista.getState();

		await client.PutTemplate(id, { name: name, items: items });
		updateTemplate(id, { name: name, items: items });
	},
};
