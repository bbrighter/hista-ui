import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import type { ChangeEvent } from "react";

type CrashCheckboxProps = {
	crash: boolean;
	setCrash: (checked: boolean) => void;
};

export const CrashCheckbox = ({ crash, setCrash }: CrashCheckboxProps) => {
	const onChange = (_: ChangeEvent, checked: boolean) => setCrash(checked);
	return (
		<FormControlLabel
			control={<Checkbox checked={crash} onChange={onChange} />}
			label="Crash"
		/>
	);
};
