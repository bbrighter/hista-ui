import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useAppNavigate } from "../../../hooks/useNavigate";
import { Icons } from "../../components/Icons";

export type CardType = keyof typeof CARD_CONFIG;

type StartPageCardProps = {
	type: CardType;
	highlight?: boolean;
};

export default function StartPageCard({ type, highlight }: StartPageCardProps) {
	const navigate = useAppNavigate();
	const { title, content, icon: Icon, onClick } = CARD_CONFIG[type](navigate);

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

const CARD_CONFIG = {
	meals: (navigate: ReturnType<typeof useAppNavigate>) => ({
		title: "Mahlzeiten",
		content: "Mahlzeiten hinzufügen, ansehen und bearbeiten",
		icon: Icons.meal,
		onClick: navigate.to.meals,
	}),
	conditionEvents: (navigate: ReturnType<typeof useAppNavigate>) => ({
		title: "Symptome",
		content: "Symptome aufzeichnen",
		icon: Icons.symptom,
		onClick: navigate.to.conditionEvents,
	}),
	statistics: (navigate: ReturnType<typeof useAppNavigate>) => ({
		title: "Auswertungen",
		content: "Ernährungstagebuch und mehr",
		icon: Icons.statistics,
		onClick: navigate.to.statistics,
	}),
	notes: (navigate: ReturnType<typeof useAppNavigate>) => ({
		title: "Notizen",
		content: "Notizen anfertigen und durchsuchen",
		icon: Icons.notes,
		onClick: navigate.to.notes,
	}),
	pollens: (navigate: ReturnType<typeof useAppNavigate>) => ({
		title: "Pollen",
		content: "Pollenflug bewundern",
		icon: Icons.pollens,
		onClick: navigate.to.pollens,
	}),
	status: (navigate: ReturnType<typeof useAppNavigate>) => ({
		title: "Status",
		content: "Wie geht's denn heute?",
		icon: Icons.status,
		onClick: navigate.to.statuses,
	}),
	headaches: (navigate: ReturnType<typeof useAppNavigate>) => ({
		title: "Kopfweh",
		content: "Kopfschmerztagebuch",
		icon: Icons.headaches,
		onClick: navigate.to.headaches,
	}),
	medicines: (navigate: ReturnType<typeof useAppNavigate>) => ({
		title: "Medikamente",
		content: "Einnehmen und eintragen",
		icon: Icons.medicines,
		onClick: navigate.to.medicine,
	}),
} as const;
