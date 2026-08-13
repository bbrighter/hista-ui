import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actions } from "@/actions";
import useHista from "@/store/store";
import { StatusSliders } from "./StatusSliders/StatusSliders";

const Status = () => {
	const params = useParams<{ id: string }>();
	const status = useHista((state) =>
		state.statuses.find((s) => s.id === Number(params.id ?? 0)),
	);
	const onChange = actions.status.patch;

	useEffect(() => {
		actions.status.list();
	}, []);

	if (!status) return <>Kein Status gefunden</>;

	return (
		<Container sx={{ pt: "2rem" }}>
			<Typography variant="h6">
				{status.date.format("dd, DD.MM.YYYY")}
			</Typography>
			<StatusSliders status={status} onChange={onChange} />
		</Container>
	);
};

export default Status;
