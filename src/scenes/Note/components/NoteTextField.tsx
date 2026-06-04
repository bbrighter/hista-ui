import TextField from "@mui/material/TextField";
import { useState } from "react";

import { actions } from "../../../actions";
import useDebounce from "../../../hooks/useDebounce";
import { useDidUpdateEffect } from "../../../hooks/useDidUpdateEffect";
import { useNote } from "../../../store";

export const NoteTextField = ({ noteId }: { noteId: number }) => {
	const [isUpToDate, setIsUpToDate] = useState(true);
	const initialText = useNote(noteId).text;
	const [value, setValue] = useState(initialText);
	const debouncedInputValue = useDebounce(value, 1000);

	useDidUpdateEffect(() => {
		actions.notes
			.patchText(noteId, debouncedInputValue)
			.then(() => setIsUpToDate(true));
	}, [debouncedInputValue]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		setIsUpToDate(false);
	};

	return (
		<TextField
			data-testid="note-text-field"
			helperText={isUpToDate ? "" : "Noch nicht gespeichert..."}
			sx={{ marginTop: "1rem", height: "200px" }}
			multiline
			value={value}
			onChange={onChange}
			label="Notiz"
			minRows={15}
			color={isUpToDate ? "primary" : "secondary"}
		/>
	);
};
