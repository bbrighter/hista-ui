import Box from "@mui/material/Box";
import { useEffect, useMemo } from "react";
import { DownloadExcelButton } from "@/scenes/components/DownloadExcelButton/DownloadExcelButton";
import useHista from "@/store/store";
import { actions } from "../../../actions";
import { DiaryGrid } from "./DiaryGrid/DiaryGrid";
import { buildWorkbook } from "./gridsAndExports/buildWorkbook";
import { toDiaryRows } from "./gridsAndExports/diaryColumns";

export function Diary() {
	const diary = useHista((state) => state.diaryEntries);
	const rows = useMemo(() => toDiaryRows(diary), [diary]);

	useEffect(() => {
		actions.statistics.getDiaries();
	}, []);

	return (
		<Box>
			<DownloadExcelButton
				label="Ernährungstagebuch herunterladen"
				fileTitle="tagebuch"
				entries={diary}
				createWorkbook={buildWorkbook}
			/>
			<DiaryGrid rows={rows} />
		</Box>
	);
}
