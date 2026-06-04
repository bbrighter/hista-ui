import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { Dayjs } from "dayjs";
import { useParams } from "react-router-dom";

import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import { selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";
import DateInput from "../components/DateInput";
import DebouncedSlider from "../components/DebouncedSlider";
import { getColor } from "./components/colorMapping";
import HeadacheDescription from "./components/HeadacheDescription";
import HeadachePositionsButtons from "./components/HeadachePositions";
import HeadacheSymptomsButtons from "./components/HeadacheSymptoms";
import HeadacheTypesButtons from "./components/HeadacheTypes";

export default function Headache() {
	const isLOading = useHista(selectIsLoadingAny(["headache"]));
	const { headacheId } = useParams<{ headacheId: string }>();
	const id = Number(headacheId);
	const headache = useHista((state) => state.headache);

	usePiidEffect(() => {
		actions.headaches.get(id);
	}, [headacheId]);

	const onSeverityChange = (v: number) => {
		if (v !== headache.severity) {
			actions.headaches.patchSeverity(id, v);
		}
	};

	const onDateChange = (v: Dayjs | null) => {
		if (!v) return;
		actions.headaches.patchDate(id, v);
	};

	const iconMapping = (value: number) => {
		return (
			<Typography
				sx={{
					borderRadius: "50%",
					width: "2rem",
					height: "2rem",
					backgroundColor: getColor(value),
					color: "black",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "1.2rem",
					fontWeight: "bold",
				}}
				data-testid="slider-icon"
			>
				{value}
			</Typography>
		);
	};

	return (
		<Loading show={isLOading}>
			<Container sx={{ padding: "2rem" }}>
				<DateInput title="Datum" date={headache.date} onChange={onDateChange} />
				<DebouncedSlider
					initialValue={headache.severity}
					onChange={onSeverityChange}
					label="Schwere"
					min={0}
					max={10}
					colorMapping={getColor}
					iconMapping={iconMapping}
				/>
				<HeadachePositionsButtons />
				<HeadacheTypesButtons />
				<HeadacheSymptomsButtons />
				<HeadacheDescription />
			</Container>
		</Loading>
	);
}
