import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"

import { headacheColumnGroupingModel, headacheGridColumns, useHeadacheGridRows } from "./headacheColumns"

export function HeadacheGrid() {
  const rows = useHeadacheGridRows()

  return (
    <Box style={{ display: "flex", flexDirection: "column", maxHeight: 1000 }}>
      <DataGrid
        columns={headacheGridColumns}
        rows={rows}
        columnGroupingModel={headacheColumnGroupingModel}
        disableColumnMenu
      />
    </Box>
  )
}
