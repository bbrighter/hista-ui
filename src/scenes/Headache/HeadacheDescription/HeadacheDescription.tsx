import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

type HeadacheDescriptionProps = {
	description: string;
	saveDescription: (value: string) => Promise<void>;
};

export const HeadacheDebouncedDescription = ({
	description,
	saveDescription,
}: HeadacheDescriptionProps) => {
	const [currentDescription, setCurrentDescription] = useState(description);
	const isDirty = description !== currentDescription;

	useEffect(() => {
		setCurrentDescription(description);
	}, [description]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentDescription(e.target.value);
	};

	useDebounce(() => {
		if (isDirty) {
			saveDescription(currentDescription);
		}
	}, 1000);

	return (
		<TextField
			sx={{ mt: 2 }}
			label="Zusätzliche Infos"
			multiline
			minRows={3}
			value={currentDescription}
			fullWidth
			color={isDirty ? "secondary" : "primary"}
			onChange={onChange}
		/>
	);
};
