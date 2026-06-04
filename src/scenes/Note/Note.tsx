import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import { useParams } from "react-router-dom";

import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import { NoteDateInput, NoteTextField } from "./components";

export const Note = () => {
	const params = useParams<{ noteId: string }>();
	const noteId = Number(params.noteId);

	usePiidEffect(() => {
		actions.notes.list();
	}, [params.noteId]);

	return (
		<Container sx={{ padding: "2rem" }}>
			<FormGroup>
				<NoteDateInput noteId={noteId} />
				<NoteTextField noteId={noteId} />
			</FormGroup>
		</Container>
	);
};
