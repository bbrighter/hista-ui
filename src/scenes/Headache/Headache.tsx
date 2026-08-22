import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import type { Dayjs } from "dayjs";
import { useParams } from "react-router-dom";
import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import {
	selectIsLoadingAny,
	validHeadachePositions,
	validHeadacheSymptoms,
	validHeadacheTypes,
} from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";
import DateInput from "../components/DateInput/DateInput";
import { HeadacheDebouncedDescription } from "./HeadacheDescription/HeadacheDescription";
import { HeadacheTags } from "./HeadacheTags/HeadacheTags";
import { SeveritySlider } from "./SeveritySlider/SeveritySlider";

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

	return (
		<Loading show={isLOading}>
			<Container sx={{ padding: "2rem" }}>
				<DateInput title="Datum" date={headache.date} onChange={onDateChange} />
				<SeveritySlider
					severity={headache.severity}
					onSeverityChange={onSeverityChange}
				/>
				<HeadacheTags
					label="Wo?"
					options={validHeadachePositions}
					values={headache.positions}
					updateTags={(pos) => actions.headaches.patchPositions(id, pos)}
				/>
				<HeadacheTags
					label="Art"
					options={validHeadacheTypes}
					values={headache.types}
					updateTags={(typ) => actions.headaches.patchTypes(id, typ)}
				/>
				<HeadacheTags
					label="Weitere Symptome"
					options={validHeadacheSymptoms}
					values={headache.symptoms}
					updateTags={(sym) => actions.headaches.patchSymptoms(id, sym)}
				/>
				<Divider sx={{ pt: 1 }} />
				<HeadacheDebouncedDescription
					description={headache.description}
					saveDescription={(v) => actions.headaches.patchDescription(id, v)}
				/>
			</Container>
		</Loading>
	);
}
