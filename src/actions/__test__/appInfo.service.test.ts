import { describe, expect, it } from "vitest";
import { getAppInfoHandler } from "@/__tests__/mocks/appInfoHandlers";
import { server } from "@/__tests__/setupTest";
import useHista from "@/store/store";
import { appInfo } from "../appInfo.actions";

describe("get app info data", () => {
	it("false", async () => {
		await appInfo.get();

		const { entitiesFilled, loaded } = useHista.getState();
		expect(loaded.appInfo).toBeTruthy();
		expect(entitiesFilled.headaches).toBeFalsy();
		expect(entitiesFilled.statuses).toBeFalsy();
	});

	it("true", async () => {
		server.use(
			getAppInfoHandler({
				entitiesFilled: [
					{ entity: "headaches", filled: true },
					{ entity: "statuses", filled: true },
				],
			}),
		);

		await appInfo.get();

		const { entitiesFilled, loaded } = useHista.getState();
		expect(loaded.appInfo).toBeTruthy();
		expect(entitiesFilled.headaches).toBeTruthy();
		expect(entitiesFilled.statuses).toBeTruthy();
	});
});
