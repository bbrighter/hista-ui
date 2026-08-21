import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { actions } from "@/actions";
import { useDidUpdateEffect } from "@/hooks/useDidUpdateEffect";
import type { PutStatusParams, Status } from "@/store";
import useHista from "@/store/store";
import { CrashCheckbox } from "./CrashCheckbox/CrashCheckbox";
import { StatusSliders } from "./StatusSliders/StatusSliders";
import type { SymptomKey } from "./symptomValues";
import { useDebouncedSave } from "./useDebouncedSave";

const StatusComponent = () => {
	const params = useParams<{ id: string }>();
	const status = useHista((state) =>
		state.statuses.find((s) => s.id === Number(params.id ?? 0)),
	);

	useEffect(() => {
		actions.status.list();
	}, []);

	if (!status)
		return <Typography color="error">Kein Status gefunden</Typography>;

	return <StatusForm status={status} />;
};

const StatusForm = ({ status }: { status: Status }) => {
	const { id, date, crash, ...initialSymptoms } = status;
	const [symptoms, setSymptoms] = useState(initialSymptoms);
	const [crashValue, setCrashValue] = useState(status.crash ?? false);

	const isDirty = (key: SymptomKey) => symptoms[key] !== initialSymptoms[key];

	const debouncedSave = useDebouncedSave(async (params: PutStatusParams) => {
		await actions.status.patch(status.id, params);
	}, 1000);

	useDidUpdateEffect(() => {
		debouncedSave({
			...symptoms,
			date: date,
			crash: crashValue,
		});
	}, [symptoms, crashValue]);

	useEffect(() => {
		actions.status.list();
	}, []);

	return (
		<Container sx={{ padding: "2rem" }}>
			<Typography variant="h6">
				{status.date.format("dd, DD.MM.YYYY")}
			</Typography>
			<StatusSliders
				symptoms={symptoms}
				setSymptoms={setSymptoms}
				isDirty={isDirty}
			/>
			<CrashCheckbox crash={crashValue} setCrash={setCrashValue} />
		</Container>
	);
};

export default StatusComponent;
