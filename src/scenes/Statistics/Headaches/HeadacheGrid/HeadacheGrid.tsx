import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridRowsProp } from "@mui/x-data-grid/models";
import {
	headacheColumnGroupingModel,
	headacheGridColumns,
} from "../gridsAndExports/headacheColumns";

type HeadacheGridProps = {
	rows: GridRowsProp;
};

export function HeadacheGrid({ rows }: HeadacheGridProps) {
	return (
		<Box style={{ display: "flex", flexDirection: "column", maxHeight: 1000 }}>
			<DataGrid
				columns={headacheGridColumns}
				rows={rows}
				columnGroupingModel={headacheColumnGroupingModel}
				disableColumnMenu
			/>
		</Box>
	);
}
