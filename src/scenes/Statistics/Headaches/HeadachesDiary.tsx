import Box from "@mui/material/Box";
import { useEffect } from "react";

import { actions } from "../../../actions";
import { HeadacheDownloadButton, HeadacheGrid } from "./components";

export function HeadacheDiary() {
	useEffect(() => {
		actions.headaches.list();
	}, []);

	return (
		<Box>
			<HeadacheDownloadButton />
			<HeadacheGrid />
		</Box>
	);
}
