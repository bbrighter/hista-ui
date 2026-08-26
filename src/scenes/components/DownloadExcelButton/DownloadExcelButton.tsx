import Button from "@mui/material/Button";
import { useState } from "react";
import type { WorkBook } from "xlsx";
import { Icons } from "../Icons";

export type DownloadExcelButtonProps<T> = {
	label: string;
	fileTitle: string;
	entries: Array<T>;
	createWorkbook: (entries: Array<T>) => Promise<WorkBook>;
};

export const DownloadExcelButton = <T,>({
	label,
	fileTitle,
	entries,
	createWorkbook,
}: DownloadExcelButtonProps<T>) => {
	const [loading, setLoading] = useState(false);

	const onClick = async () => {
		setLoading(true);
		const { writeFile } = await import("xlsx");
		const workbook = await createWorkbook(entries);
		writeFile(workbook, `${fileTitle}.xlsx`);
		setLoading(false);
	};

	return (
		<Button
			sx={{ marginTop: "1rem", marginBottom: "1rem" }}
			startIcon={<Icons.actions.download />}
			onClick={onClick}
			loading={loading}
			variant="outlined"
		>
			{label}
		</Button>
	);
};
