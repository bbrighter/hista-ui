import Grid from "@mui/material/Grid";
import DateInput from "@/scenes/components/DateInput/DateInput";
import { FreshnessSlider } from "./FreshnessSlider";
import { PeopleToggleButton } from "./PeopleToggleButton";
import { StressSlider } from "./StressSlider";

type MealSettingAttributes = {
	date: Date;
	stressLevel: number;
	freshness: number;
	isAlone: boolean;
};

type MealSettingActions = {
	setDate: (dateString: string) => Promise<void>;
	setStressLevel: (v: number) => Promise<void>;
	setFreshness: (v: number) => Promise<void>;
	setAloneness: (v: boolean) => Promise<void>;
};

export function MealSettings({
	date,
	freshness,
	isAlone,
	stressLevel,
	setDate,
	setFreshness,
	setStressLevel,
	setAloneness,
}: MealSettingActions & MealSettingAttributes) {
	const handleToggleOptionChange = async (value: boolean | null) => {
		if (value == null) return;
		await setAloneness(value);
	};

	return (
		<Grid
			container
			spacing={2}
			sx={{
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Grid size={{ xs: 12 }}>
				<DateInput
					title="Mahlzeit"
					date={date}
					onChange={(e) =>
						setDate(e?.toISOString() || new Date().toISOString())
					}
				/>
			</Grid>
			<Grid size={{ xs: 12 }}>
				<StressSlider
					setStressLevel={setStressLevel}
					stressLevel={stressLevel}
				/>
			</Grid>
			<Grid size={{ xs: 8 }}>
				<FreshnessSlider setFreshness={setFreshness} freshness={freshness} />
			</Grid>
			<Grid size={{ xs: 4 }} sx={{ textAlign: "center" }}>
				<PeopleToggleButton
					isAlone={isAlone}
					handleToggleOptionChange={handleToggleOptionChange}
				/>
			</Grid>
		</Grid>
	);
}
