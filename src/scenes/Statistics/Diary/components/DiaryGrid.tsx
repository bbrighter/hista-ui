import { DataGrid } from "@mui/x-data-grid"

import { diaryGridColumns, useDiaryRows } from "./diaryColumns"

export function DiaryGrid() {
  const rows = useDiaryRows()

  return (
    <div style={{ display: "flex", flexDirection: "column", maxHeight: 1000 }}>
      <DataGrid
        columns={diaryGridColumns}
        rows={rows}
        disableColumnMenu
      />
    </div>
  )
}
