import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export const HideFiberButton = ({
	onClick,
	value,
}: {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	value: boolean;
}) => {
	return (
		<FormControlLabel
			control={<Checkbox value={value} onClick={onClick} />}
			label="Ballaststoffe"
		/>
	);
};
