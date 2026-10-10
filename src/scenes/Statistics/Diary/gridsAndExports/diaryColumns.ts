import { t } from "@lingui/core/macro";
import type { GridColDef, GridRowsProp } from "@mui/x-data-grid/models";
import type { RawDiary } from "@/store";

export const diaryGridColumns: Array<GridColDef> = [
	{ field: "type", headerName: t`Typ`, flex: 1 },
	{ field: "date", headerName: t`Datum`, flex: 1, type: "dateTime" },
	{ field: "severity", headerName: t`Schwere`, flex: 1 },
	{ field: "what", headerName: t`Inhalt`, flex: 2 },
	{ field: "category", headerName: t`Kategorie`, flex: 1 },
];

export const toDiaryRows = (diary: Array<RawDiary>): GridRowsProp =>
	diary.map((d, i) => ({
		id: i,
		type: String(d.Type),
		date: d.Date,
		severity: d.Severity,
		what: d.What,
		category: d.Category,
	}));
