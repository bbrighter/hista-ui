import Box from "@mui/material/Box"
import { useEffect } from "react"

import { actions } from "../../../actions"
import { DiaryDownloadButton, DiaryGrid } from "./components"

export function Diary() {
  useEffect(() => {
    actions.statistics.getDiaries()
  }, [])

  return (
    <Box>
      <DiaryDownloadButton />
      <DiaryGrid />
    </Box>
  )
}
