import { CustomAppBar } from "@bbrighter/auth-module/app-bar";
import {
	AuthProvider,
	useAuth,
	useHandleUnauthorized,
} from "@bbrighter/auth-module/auth";
import {
	LocalizationProvider,
	type TranslationKey,
} from "@bbrighter/auth-module/localization";
import { SettingsProvider } from "@bbrighter/auth-module/settings";
import { UserManagementProvider } from "@bbrighter/auth-module/users";
import { i18n } from "@lingui/core";
import { t } from "@lingui/core/macro";
import { I18nProvider } from "@lingui/react";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo } from "react";
import {
	type NavigateFunction,
	Outlet,
	useLocation,
	useNavigate,
} from "react-router-dom";
import {
	useAuthStateAdapter,
	useSettingsAdapter,
	useUserManagementAdapter,
} from "./adapter";
import useHista from "./store/store";

export default function AppProvider() {
	const navigate = useNavigate();
	const location = useLocation();
	const authAdapter = useAuthStateAdapter(navigate, location);
	const userAdapter = useUserManagementAdapter();
	const settingsAdapter = useSettingsAdapter();

	return (
		<SettingsProvider adapter={settingsAdapter}>
			<InternationalizationProvider>
				<UserManagementProvider adapter={userAdapter}>
					<AuthProvider adapter={authAdapter}>
						<AppEffects navigate={navigate} />
						<CustomAppBar />
						<Outlet />
					</AuthProvider>
				</UserManagementProvider>
			</InternationalizationProvider>
		</SettingsProvider>
	);
}

const AppEffects = ({ navigate }: { navigate: NavigateFunction }) => {
	useSetPermissions();
	usePiidLocation();
	useHandleUnauthorized(navigate);
	return null;
};

const useSetPermissions = () => {
	const { setPermissions, token } = useAuth();

	// biome-ignore lint/correctness/useExhaustiveDependencies: Permissions may need to update if the token changes
	useEffect(() => {
		setPermissions();
	}, [token]);
};

const usePiidLocation = () => {
	const { piid } = useAuth();
	const setPiid = useHista((state) => state.setPiid);
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: Retriggers always if functions are included
	useEffect(() => {
		if (piid) {
			setPiid(piid);
			navigate(`/${piid}`, {
				replace: true,
			});
		}
	}, [piid]);
};

const InternationalizationProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const language = useHista((state) => state.language);
	dayjs.locale("de");

	useEffect(() => {
		i18n.activate(language);
	}, [language]);
	// biome-ignore lint/correctness/useExhaustiveDependencies: Should rerender when language changes
	const translations: Record<TranslationKey, string> = useMemo(
		() => ({
			"Nutzer einladen": t`Nutzer einladen`,
			Benutzer: t`Benutzer`,
			"Nutzer existiert nicht": t`Nutzer existiert nicht`,
			Benutzereinstellungen: t`Benutzereinstellungen`,
			Einladen: t`Einladen`,
			Einstellungen: t`Einstellungen`,
			Login: t`Login`,
			Logout: t`Logout`,
			Löschen: t`Löschen`,
			Name: t`Name`,
			Nutzerverwaltung: t`Nutzerverwaltung`,
			Passwort: t`Passwort`,
			Produkte: t`Produkte`,
		}),
		[language],
	);

	const translate = useCallback(
		(k: TranslationKey) => translations[k] ?? k,
		[translations],
	);

	return (
		<I18nProvider i18n={i18n}>
			<LocalizationProvider adapter={translate}>
				{children}
			</LocalizationProvider>
		</I18nProvider>
	);
};
