import Button from "@mui/material/Button"
import { writeFile } from "xlsx"

import { Icons } from "../../../components/Icons"
import { useBuildWorkBook } from "./useBuildWorkBook"

export function DiaryDownloadButton() {
  const buildDiaryWorkbook = useBuildWorkBook()

  const onClick = () => {
    const workbook = buildDiaryWorkbook()
    writeFile(workbook, "tagebuch.xlsx")
  }

  return (
    <Button
      sx={{ marginTop: "1rem", marginBottom: "1rem" }}
      startIcon={<Icons.actions.download />}
      variant="outlined"
      onClick={onClick}
    >
      Ernährungstagebuch herunterladen
    </Button>
  )
}
