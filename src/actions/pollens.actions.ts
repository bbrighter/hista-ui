import { client } from "../api/api";
import { respToPollens } from "../store";
import useHista from "../store/store";

export const pollens = {
	list: async () => {
		const { setPollens, loaded, setLoaded } = useHista.getState();
		if (loaded.pollens) return;

		const resp = await client.ListPollens();
		setPollens(respToPollens(resp));
		setLoaded("pollens");
	},
};
