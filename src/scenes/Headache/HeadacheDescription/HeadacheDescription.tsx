import { t } from "@lingui/core/macro";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

type HeadacheDescriptionProps = {
	description: string;
	saveDescription: (value: string) => Promise<void>;
	isLoaded: boolean;
};

export const HeadacheDebouncedDescription = ({
	description,
	saveDescription,
	isLoaded,
}: HeadacheDescriptionProps) => {
	const [currentDescription, setCurrentDescription] = useState(description);
	const initializedRef = useRef(false);
	const lastSavedDescriptionRef = useRef(description);
	const lastReceivedDescriptionRef = useRef(description);
	const pendingSaveRef = useRef(false);
	const isDirty = lastSavedDescriptionRef.current !== currentDescription;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentDescription(e.target.value);
	};

	useEffect(() => {
		if (initializedRef.current) return;
		if (isLoaded) {
			lastSavedDescriptionRef.current = description;
			lastReceivedDescriptionRef.current = description;
			setCurrentDescription(description);
			initializedRef.current = true;
		}
	}, [isLoaded, description]);

	useDebounce(async () => {
		if (!initializedRef) return;
		if (!isDirty) return;
		if (pendingSaveRef.current) return;

		pendingSaveRef.current = true;
		await saveDescription(currentDescription);
		pendingSaveRef.current = false;
		lastSavedDescriptionRef.current = currentDescription;
	}, 1000);

	return (
		<TextField
			sx={{ mt: 2 }}
			label={t`Zusätzliche Infos`}
			multiline
			minRows={3}
			value={currentDescription}
			fullWidth
			color={isDirty ? "secondary" : "primary"}
			onChange={onChange}
		/>
	);
};
