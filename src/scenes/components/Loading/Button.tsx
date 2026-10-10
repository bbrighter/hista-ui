import { Trans } from "@lingui/react/macro";
import MuiButton, { type ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpinner } from "./useSpinner";

export const Button = ({ children, ...props }: ButtonProps) => {
	const spinner = useSpinner();
	const loadingIndicator = spinner ? undefined : (
		<Typography>
			<Trans>Lädt...</Trans>
		</Typography>
	);

	return (
		<MuiButton {...props} loadingIndicator={loadingIndicator}>
			{children}
		</MuiButton>
	);
};
