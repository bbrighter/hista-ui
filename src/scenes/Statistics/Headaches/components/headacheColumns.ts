import { GridColDef, GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models"

import { Headache, validHeadachePositions, validHeadacheSymptoms, validHeadacheTypes } from "../../../../store/headaches/headaches"
import useHista from "../../../../store/store"

export const headacheGridColumns: Array<GridColDef> = [
  { field: "date", headerName: "Zeit", type: "dateTime" },
  { field: "severity", headerName: "Schwere" },
  ...validHeadachePositions.map(v => ({ field: v.value, headerName: v.label })),
  ...validHeadacheTypes.map(v => ({ field: v.value, headerName: v.label })),
  ...validHeadacheSymptoms.map(s => ({ field: s.value, headerName: s.label })),
  { field: "description", headerName: "Beschreibung" },
]

export const headacheColumnGroupingModel: GridColumnGroupingModel = [
  { groupId: "position", headerName: "Position", children: validHeadachePositions.map(v => ({ field: v.value })) },
  { groupId: "type", headerName: "Typen", children: validHeadacheTypes.map(v => ({ field: v.value })) },
  { groupId: "symptom", headerName: "Symptome", children: validHeadacheSymptoms.map(v => ({ field: v.value })) },
]

export const useHeadacheGridRows = (): GridRowsProp => {
  const headaches = useHista(state => state.headaches)
  return headacheGridRows(headaches)
}
const headacheGridRows = (headaches: Array<Headache>): GridRowsProp => {
  return headaches.map(h => ({
    id: h.id,
    date: h.date,
    severity: h.severity,
    ...validHeadachePositions.reduce((acc, { value }) => {
      acc[value] = h.positions.some(p => p.value == value) ? "✓" : null
      return acc
    }, {}),
    ...validHeadacheTypes.reduce((acc, { value }) => {
      acc[value] = h.types.some(p => p.value == value) ? "✓" : null
      return acc
    }, {}),
    ...validHeadacheSymptoms.reduce((acc, { value }) => {
      acc[value] = h.symptoms.some(p => p.value == value) ? "✓" : null
      return acc
    }, {}),
    description: h.description,
  }))
}

export const excelHeaderColumns: string[][] = [
  headacheGridColumns.map(col => (
    headacheColumnGroupingModel.find(m =>
      m.children.some(child => "field" in child && child.field == col.field))?.headerName || ""),
  ),
  headacheGridColumns.map(c => c.headerName),
]

export const headacheExcelRows = (headaches: Array<Headache>) => {
  const rows = headacheGridRows(headaches)
  const rowsWithoutId = rows.map(({ id, ...rest }) => rest)
  return rowsWithoutId.map(r => Object.values(r))
}
