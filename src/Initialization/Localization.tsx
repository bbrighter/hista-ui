import {
	LocalizationProvider,
	type TranslationKey,
} from "@bbrighter/auth-module/localization";
import { i18n } from "@lingui/core";
import { t } from "@lingui/core/macro";
import { I18nProvider } from "@lingui/react";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo } from "react";
import { messages as deMessages } from "@/locales/de-DE/messages";
import { messages as swMessages } from "@/locales/de-SW/messages";
import useHista from "@/store/store";

export const InternationalizationProvider = ({
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

export const ensureLocalization = () => {
	i18n.load({
		"de-DE": deMessages,
		"de-SW": swMessages,
	});
	const language = useHista.getState().language;
	i18n.activate(language);
};
