import { t } from "@lingui/core/macro";
import type {
	GridColDef,
	GridColumnGroupingModel,
	GridRowsProp,
} from "@mui/x-data-grid/models";
import {
	type Headache,
	useHeadaches,
	validHeadachePositions,
	validHeadacheSymptoms,
	validHeadacheTypes,
} from "../../../../store";

export const headacheGridColumns: Array<GridColDef> = [
	{ field: "date", headerName: t`Zeit`, type: "dateTime" },
	{ field: "severity", headerName: t`Schwere` },
	...validHeadachePositions.map((v) => ({
		field: v.value,
		headerName: v.label,
	})),
	...validHeadacheTypes.map((v) => ({ field: v.value, headerName: v.label })),
	...validHeadacheSymptoms.map((s) => ({
		field: s.value,
		headerName: s.label,
	})),
	{ field: "description", headerName: t`Beschreibung` },
];

export const headacheColumnGroupingModel: GridColumnGroupingModel = [
	{
		groupId: "position",
		headerName: t`Position`,
		children: validHeadachePositions.map((v) => ({ field: v.value })),
	},
	{
		groupId: "type",
		headerName: t`Typen`,
		children: validHeadacheTypes.map((v) => ({ field: v.value })),
	},
	{
		groupId: "symptom",
		headerName: t`Symptome`,
		children: validHeadacheSymptoms.map((v) => ({ field: v.value })),
	},
];

export const useHeadacheGridRows = (): GridRowsProp => {
	const headaches = useHeadaches();
	return headacheGridRows(headaches);
};
const headacheGridRows = (headaches: Array<Headache>): GridRowsProp => {
	return headaches.map((h) => ({
		id: h.id,
		date: h.date,
		severity: h.severity,
		...validHeadachePositions.reduce(
			(acc, { value }) => {
				acc[value] = h.positions.some((p) => p.value === value) ? "✓" : null;
				return acc;
			},
			{} as Record<string, string | null>,
		),
		...validHeadacheTypes.reduce(
			(acc, { value }) => {
				acc[value] = h.types.some((p) => p.value === value) ? "✓" : null;
				return acc;
			},
			{} as Record<string, string | null>,
		),
		...validHeadacheSymptoms.reduce(
			(acc, { value }) => {
				acc[value] = h.symptoms.some((p) => p.value === value) ? "✓" : null;
				return acc;
			},
			{} as Record<string, string | null>,
		),
		description: h.description,
	}));
};

export const excelHeaderColumns: string[][] = [
	headacheGridColumns.map(
		(col) =>
			headacheColumnGroupingModel.find((m) =>
				m.children.some(
					(child) => "field" in child && child.field === col.field,
				),
			)?.headerName || "",
	),
	headacheGridColumns.map((c) => c.headerName ?? ""),
];

export const headacheExcelRows = (headaches: Array<Headache>) => {
	const rows = headacheGridRows(headaches);
	const rowsWithoutId = rows.map(({ id, ...rest }) => rest);
	return rowsWithoutId.map((r) => Object.values(r));
};
