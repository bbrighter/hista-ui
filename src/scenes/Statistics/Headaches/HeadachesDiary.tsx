import Box from "@mui/material/Box"
import { useEffect } from "react"

import { services } from "../../../store"
import { HeadacheDownloadButton, HeadacheGrid } from "./components"

export function HeadacheDiary() {
  useEffect(() => {
    services.headaches.list()
  }, [])

  return (
    <Box>
      <HeadacheDownloadButton />
      <HeadacheGrid />
    </Box>
  )
}
