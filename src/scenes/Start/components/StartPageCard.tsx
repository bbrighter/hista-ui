import type { I18n } from "@lingui/core";
import { t } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useAppNavigate } from "../../../hooks/useNavigate";
import { Icons } from "../../components/Icons";

export type CardType = keyof ReturnType<typeof card_configuration>;

type StartPageCardProps = {
	type: CardType;
	highlight?: boolean;
};

export default function StartPageCard({ type, highlight }: StartPageCardProps) {
	const { i18n } = useLingui(); // Needed, otherwise the component does not re-render on language change
	const navigate = useAppNavigate();
	const {
		title,
		content,
		icon: Icon,
		onClick,
	} = card_configuration(navigate, i18n)[type];

	const fontHighlightColor = highlight ? "#5F43C2" : "inherit";
	const borderColor = highlight ? "#5F43C2" : "divider";

	return (
		<Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
			<Card
				sx={{
					width: "100%",
					cursor: "pointer",
					transition: "background-color 0.2s ease",
					"&:hover": {
						backgroundColor: "action.hover",
					},
					borderColor: borderColor,
				}}
				variant="outlined"
				onClick={onClick}
			>
				<CardHeader
					avatar={<Icon style={{ color: fontHighlightColor }} />}
					title={
						<Typography sx={{ color: fontHighlightColor }} variant="h4">
							{title}
						</Typography>
					}
				></CardHeader>
				<CardContent>
					<Typography component="div" color="text.secondary">
						{content}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

const card_configuration = (
	navigate: ReturnType<typeof useAppNavigate>,
	_i18n: I18n,
) => ({
	meals: {
		title: t`Mahlzeiten`,
		content: t`Mahlzeiten hinzufügen, ansehen und bearbeiten`,
		icon: Icons.meal,
		onClick: navigate.to.meals,
	},
	conditionEvents: {
		title: t`Symptome`,
		content: t`Symptome aufzeichnen`,
		icon: Icons.symptom,
		onClick: navigate.to.conditionEvents,
	},
	statistics: {
		title: t`Auswertungen`,
		content: t`Ernährungstagebuch und mehr`,
		icon: Icons.statistics,
		onClick: navigate.to.statistics,
	},
	notes: {
		title: t`Notizen`,
		content: t`Notizen anfertigen und durchsuchen`,
		icon: Icons.notes,
		onClick: navigate.to.notes,
	},
	pollens: {
		title: t`Pollen`,
		content: t`Pollenflug bewundern`,
		icon: Icons.pollens,
		onClick: navigate.to.pollens,
	},
	headaches: {
		title: t`Kopfweh`,
		content: t`Kopfschmerztagebuch`,
		icon: Icons.headaches,
		onClick: navigate.to.headaches,
	},
	medicines: {
		title: t`Medikamente`,
		content: t`Einnehmen und eintragen`,
		icon: Icons.medicines,
		onClick: navigate.to.medicine,
	},
	status: {
		title: t`Status`,
		content: t`Wie geht's heute? Und wie ging's gestern?`,
		icon: Icons.status,
		onClick: navigate.to.status,
	},
});
