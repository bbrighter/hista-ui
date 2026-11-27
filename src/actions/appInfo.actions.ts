import { client } from "@/api/api";
import { respToAppInfo } from "@/store";
import useHista from "@/store/store";

export const appInfo = {
	get: async () => {
		const { setAppInfo, setLoaded } = useHista.getState();

		const resp = await client.GetMetaInformation();
		setAppInfo(respToAppInfo(resp).entitiesFilled);
		setLoaded("appInfo");
	},
};
