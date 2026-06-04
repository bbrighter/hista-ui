import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

import { Icons } from "../../components/Icons";

export function NoteSearch(props: {
	searchValue: string;
	onClear: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	const isClearable = props.searchValue !== "";

	return (
		<Input
			sx={{ marginTop: "1rem", width: "100%" }}
			startAdornment={<Icons.actions.search />}
			endAdornment={
				isClearable && (
					<IconButton sx={{ height: "2rem" }} onClick={props.onClear}>
						<Icons.actions.clear fontSize="small" />
					</IconButton>
				)
			}
			type="search"
			value={props.searchValue}
			onChange={props.onChange}
			title="Suche"
		/>
	);
}
