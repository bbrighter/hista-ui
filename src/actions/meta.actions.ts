import { client } from "@/api/api";
import { respToMeta } from "@/store";
import useHista from "@/store/store";

export const meta = {
	get: async () => {
		const { setMeta, setLoaded } = useHista.getState();

		const resp = await client.GetMetaInformation();
		setMeta(respToMeta(resp).entitiesFilled);
		setLoaded("meta");
	},
};
