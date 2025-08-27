import { DataGrid, GridRowsProp } from '@mui/x-data-grid';

import useHista from '../../../store/store';
import { diaryGridColumns } from './diaryColumns';

export default function DiaryGrid() {
    const diary = useHista(state => state.diaryEntries)

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
                columns={diaryGridColumns}
                rows={rows}
                disableColumnMenu
            />
        </div>
    )
}