import Button from "@mui/material/Button"
import { useState } from "react"
import { writeFile } from "xlsx"

import { Icons } from "../../../components/Icons"
import { useBuildHeadacheWorkBook } from "./headacheExport"

export function HeadacheDownloadButton() {
  const [loading, setLoading] = useState(false)

  const buildHeadacheWorkbook = useBuildHeadacheWorkBook()

  const onClick = async () => {
    setLoading(true)
    const workbook = buildHeadacheWorkbook()
    writeFile(workbook, "Kopfschmerz.xlsx")
    setLoading(false)
  }

  return (
    <Button
      sx={{ marginTop: "1rem", marginBottom: "1rem" }}
      startIcon={<Icons.actions.download />}
      onClick={onClick}
      loading={loading}
      variant="outlined"
    >
      Kopfschmerzen herunterladen
    </Button>
  )
}
