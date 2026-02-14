import { GridColDef, GridRowsProp } from '@mui/x-data-grid'

import useHista from '../../../../store/store'

export const diaryGridColumns: Array<GridColDef> = [
  { field: 'type', headerName: 'Typ', flex: 1 },
  { field: 'date', headerName: 'Datum', flex: 1, type: 'dateTime' },
  { field: 'severity', headerName: 'Schwere', flex: 1 },
  { field: 'what', headerName: 'Inhalt', flex: 2 },
  { field: 'category', headerName: 'Kategorie', flex: 1 },
]

export const useDiaryRows = (): GridRowsProp => {
  const diary = useHista(state => state.diaryEntries)
  return diary.map((d, i) => (
    {
      id: i,
      type: String(d.Type),
      date: d.Date,
      severity: d.Severity,
      what: d.What,
      category: d.Category,
    }))
}
