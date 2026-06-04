import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type ToggleVisibilityProps = {
	checked: boolean;
	onChange: () => void;
};

export const ToggleVisibility = ({
	checked,
	onChange,
}: ToggleVisibilityProps) => {
	return (
		<FormControlLabel
			control={
				<Checkbox
					data-testid="toggle-visibility-checkbox"
					checked={checked}
					onChange={onChange}
				/>
			}
			label="Archivierte anzeigen"
		/>
	);
};
