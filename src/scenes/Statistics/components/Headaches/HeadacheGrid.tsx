import { DataGrid, GridRowsProp } from '@mui/x-data-grid';

import useHista from '../../../../store/store';
import { headacheColumnGroupingModel, headacheGridColumns } from './headacheColumns';


export default function HeadacheGrid() {
    const headaches = useHista(state => state.headaches)

    const rows: GridRowsProp = headaches.map(h => ({
        id: h.id,
        date: h.date.toLocaleString(),
        severity: h.severity,
        description: h.description,
        ...h.positions.reduce((acc, { value }) => {
            acc[value] = '✓'
            return acc
        }, {}),
        ...h.types.reduce((acc, { value }) => {
            acc[value] = '✓'
            return acc
        }, {}),
        ...h.symptoms.reduce((acc, { value }) => {
            acc[value] = '✓'
            return acc
        }, {}),
    }),
    )



    return (
        <DataGrid
            columns={headacheGridColumns}
            rows={rows}
            columnGroupingModel={headacheColumnGroupingModel}
            disableColumnMenu
        />
    )
}