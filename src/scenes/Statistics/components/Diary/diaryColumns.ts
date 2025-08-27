import { GridColDef } from '@mui/x-data-grid';
import { Column } from 'exceljs';

export const diaryGridColumns: Array<GridColDef> = [
    { field: 'type', headerName: 'Typ', flex: 1 },
    { field: 'date', headerName: 'Datum', flex: 1 },
    { field: 'hour', headerName: 'Zeit', flex: 1 },
    { field: 'severity', headerName: 'Schwere', flex: 1 },
    { field: 'what', headerName: 'Inhalt', flex: 2 },
    { field: 'category', headerName: 'Kategorie', flex: 1 },
]

export const diaryExcelColumns: Array<Partial<Column>> = diaryGridColumns.map(c => ({
    key: c.field,
    header: c.headerName,
}))