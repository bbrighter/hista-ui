import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import useHista from '../../../store/store';

export default function DiaryGrid() {
    const diary = useHista(state => state.diaryEntries)


    const columns: Array<GridColDef> = [
        { field: 'type', headerName: 'Typ', flex: 1 },
        { field: 'date', headerName: 'Datum', flex: 1 },
        { field: 'hour', headerName: 'Zeit', flex: 1 },
        { field: 'severity', headerName: 'Schwere', flex: 1 },
        { field: 'what', headerName: 'Inhalt', flex: 2 },
        { field: 'category', headerName: 'Kategorie', flex: 1 },
    ]

    const rows: GridRowsProp = diary.map((d, i) => (
        {
            id: i,
            type: String(d.Type),
            date: d.DateString,
            hour: d.Hour,
            severity: d.Severity,
            what: d.What,
            category: d.Category,
        }
    ))


    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                disableColumnMenu
            />
        </div>
    )
}