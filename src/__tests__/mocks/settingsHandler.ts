import { HttpResponse, http } from "msw";
import type { users } from "@/api/generatedApi";

export const getUserSettingsHandler = (
	override: Partial<users.UserSettingsResponse> = {},
) =>
	http.get("/user-settings", () =>
		HttpResponse.json({
			language: "de-DE",
			loadingMode: "spinner",
			...override,
		} satisfies users.UserSettingsResponse),
	);

export const patchUserSettingsHandler = () =>
	http.patch("/user-settings", () => HttpResponse.json({}));
