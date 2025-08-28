import { GridColDef, GridColumnGroupingModel, GridRowsProp } from '@mui/x-data-grid';

import { Headache, validHeadachePositions, validHeadacheSymptoms, validHeadacheTypes } from '../../../../store/headaches/headaches';

export const headacheGridColumns: Array<GridColDef> = [
    { field: 'date', headerName: 'Zeit', type: 'dateTime' },
    { field: 'severity', headerName: 'Schwere' },
    ...validHeadachePositions.map(v => ({ field: v.value, headerName: v.label })),
    ...validHeadacheTypes.map(v => ({ field: v.value, headerName: v.label })),
    ...validHeadacheSymptoms.map(s => ({ field: s.value, headerName: s.label })),
    { field: 'description', headerName: 'Beschreibung' },
]

export const headacheColumnGroupingModel: GridColumnGroupingModel = [
    { groupId: 'position', headerName: 'Position', children: validHeadachePositions.map(v => ({ field: v.value })) },
    { groupId: 'type', headerName: 'Typen', children: validHeadacheTypes.map(v => ({ field: v.value })) },
    { groupId: 'symptom', headerName: 'Symptome', children: validHeadacheSymptoms.map(v => ({ field: v.value })) },
]

interface GroupedColumn {
    sharedHeader: string;
    columns: string[];
}

export const headacheExcelColumnGrouping: Array<GroupedColumn> = headacheGridColumns.reduce<Array<GroupedColumn>>((acc, v) => {
    const existingGroup = headacheColumnGroupingModel.find(g => g.children.some(c => 'field' in c && c.field == v.field))
    if (existingGroup) {
        const relevantAcc = acc.find(a => a.sharedHeader == existingGroup.headerName)
        if (relevantAcc) {
            relevantAcc.columns.push(v.headerName)
        } else {
            acc.push({ sharedHeader: existingGroup.headerName, columns: [v.headerName] })
        }
    } else {
        acc.push({ sharedHeader: '', columns: [v.headerName] })
    }
    return acc
}, [])

export const headacheRows = (headaches: Array<Headache>): GridRowsProp => {
    return headaches.map((h, i) => ({
        id: i,
        date: h.date,
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
    }))
}