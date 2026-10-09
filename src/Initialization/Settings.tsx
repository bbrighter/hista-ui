import {
	SettingsProvider,
	type SettingsStateAdapter,
} from "@bbrighter/auth-module/settings";
import { userApi } from "@/api/api";
import useHista from "@/store/store";

export const Settings = ({ children }: { children: React.ReactNode }) => {
	const adapter = useSettingsAdapter();
	return <SettingsProvider adapter={adapter}>{children}</SettingsProvider>;
};

const useSettingsAdapter = (): SettingsStateAdapter => {
	const useSettingsApi = () => userApi;

	const language = useHista((state) => state.language);
	const loadingMode = useHista((state) => state.loadingMode);
	const setSettings = useHista((state) => state.setUserSettings);
	const useSettings = () => ({
		settings: { language: language, loadingMode: loadingMode },
		setSettings: setSettings,
		availableLanguages: [
			{ value: "de-DE", label: "Deutsch" },
			{ value: "de-SW", label: "Schwäbisch" },
		],
	});

	return {
		useSettings,
		useSettingsApi,
	};
};
