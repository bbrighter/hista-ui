import DownloadIcon from "@mui/icons-material/Download"
import Button from "@mui/material/Button"
import { writeFile } from "xlsx"

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
      startIcon={<DownloadIcon />}
      variant="outlined"
      onClick={onClick}
    >
      Ernährungstagebuch herunterladen
    </Button>
  )
}
