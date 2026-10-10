import CircularProgress from "@mui/material/CircularProgress";
import Icon from "@mui/material/Icon";
import type { SxProps, Theme } from "@mui/material/styles";
import { Icons } from "../Icons";
import { useSpinner } from "./useSpinner";

type ProgressIndicatorProps = {
	size?: number | string;
	sx?: SxProps<Theme>;
};

export const ProgressIndicator = (props: ProgressIndicatorProps) => {
	const isSpinner = useSpinner();
	const size = props.size ?? 40;

	return isSpinner ? (
		<CircularProgress size={size} sx={props.sx} data-testid="loading" />
	) : (
		<Icon
			sx={{
				display: "inline-flex",
				width: size,
				height: size,
				stroke: "#666666",
				"& svg": {
					width: "100%",
					height: "100%",
				},
				...props.sx,
			}}
			data-testid="loading"
		>
			<Icons.loading />
		</Icon>
	);
};
