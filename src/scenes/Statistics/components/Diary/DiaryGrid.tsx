import { DataGrid } from '@mui/x-data-grid'

import useHista from '../../../../store/store'
import { diaryGridColumns, diaryRows } from './diaryColumns'

export default function DiaryGrid() {
    const diary = useHista(state => state.diaryEntries)

    const rows = diaryRows(diary)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 1000 }}>
            <DataGrid
              columns={diaryGridColumns}
              rows={rows}
              disableColumnMenu
            />
        </div>
    )
}
