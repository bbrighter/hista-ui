import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridRowsProp } from "@mui/x-data-grid/models";
import { diaryGridColumns } from "../gridsAndExports/diaryColumns";

type DiaryGridProps = {
	rows: GridRowsProp;
};

export function DiaryGrid({ rows }: DiaryGridProps) {
	return (
		<div style={{ display: "flex", flexDirection: "column", maxHeight: 1000 }}>
			<DataGrid columns={diaryGridColumns} rows={rows} disableColumnMenu />
		</div>
	);
}
