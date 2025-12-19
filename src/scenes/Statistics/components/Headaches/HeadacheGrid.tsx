import { DataGrid } from '@mui/x-data-grid'

import useHista from '../../../../store/store'
import { headacheColumnGroupingModel, headacheGridColumns, headacheRows } from './headacheColumns'

export default function HeadacheGrid() {
    const headaches = useHista(state => state.headaches)
    const rows = headacheRows(headaches)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 1000 }}>
            <DataGrid
              columns={headacheGridColumns}
              rows={rows}
              columnGroupingModel={headacheColumnGroupingModel}
              disableColumnMenu
            />
        </div>
    )
}
