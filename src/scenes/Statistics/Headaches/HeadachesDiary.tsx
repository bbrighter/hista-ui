import Box from "@mui/material/Box";
import { useEffect, useMemo } from "react";
import { DownloadExcelButton } from "@/scenes/components/DownloadExcelButton/DownloadExcelButton";
import useHista from "@/store/store";
import { actions } from "../../../actions";
import { useHeadacheGridRows } from "./gridsAndExports/headacheColumns";
import { buildHeadacheWorkbook } from "./gridsAndExports/headacheExport";
import { HeadacheGrid } from "./HeadacheGrid/HeadacheGrid";

export function HeadacheDiary() {
	const headaches = useHista((state) => state.headaches);
	const headacheArray = useMemo(() => Object.values(headaches), [headaches]);
	const rows = useHeadacheGridRows();

	useEffect(() => {
		actions.headaches.list();
	}, []);

	return (
		<Box>
			<DownloadExcelButton
				fileTitle="Kopfschmerz"
				label="Kopfschmerzen herunterladen"
				entries={headacheArray}
				createWorkbook={buildHeadacheWorkbook}
			/>
			<HeadacheGrid rows={rows} />
		</Box>
	);
}
