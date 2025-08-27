import { DataGrid, GridColDef, GridColumnGroupingModel, GridRowsProp } from '@mui/x-data-grid';

import { validHeadachePositions, validHeadacheSymptoms, validHeadacheTypes } from '../../../store/headaches/headaches';
import useHista from '../../../store/store';


export default function HeadacheGrid() {
    const headaches = useHista(state => state.headaches)

    const columns: Array<GridColDef> = [
        { field: 'date', headerName: 'Zeit' },
        { field: 'severity', headerName: 'Schwere' },
        ...validHeadachePositions.map(v => ({ field: v.value, headerName: v.label })),
        ...validHeadacheTypes.map(v => ({ field: v.value, headerName: v.label })),
        ...validHeadacheSymptoms.map(s => ({ field: s.value, headerName: s.label })),
        { field: 'description', headerName: 'Beschreibung' },
    ]

    const columnGroupingModel: GridColumnGroupingModel = [
        { groupId: 'position', headerName: 'Position', children: validHeadachePositions.map(v => ({ field: v.value, headerName: v.label })) },
        { groupId: 'types', headerName: 'Typen', children: validHeadacheTypes.map(v => ({ field: v.value, headerName: v.label })) },
        { groupId: 'symptoms', headerName: 'Symptome', children: validHeadacheSymptoms.map(v => ({ field: v.value, headerName: v.label })) },
    ]

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
        <div style={{ height: '80vh', width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                columnGroupingModel={columnGroupingModel}
                disableColumnMenu
            />
        </div>
    )
}