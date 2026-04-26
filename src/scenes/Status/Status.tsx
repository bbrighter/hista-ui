import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { useEffect } from "react"

import { selectIsLoadingAny, statusService, useStatus } from "../../store"
import useHista from "../../store/store"
import { Loading } from "../components"
import { AddStatus, StatusCard } from "./components"

export default function Status() {
  const statuses = useStatus()
  const isLoading = useHista(selectIsLoadingAny(["statuses"]))

  useEffect(() => {
    statusService.getStatuses()
  }, [])

  return (
    <Loading show={isLoading}>
      <Container sx={{ padding: "2rem" }}>
        <AddStatus disabled={isLoading} />
        <Grid container>
          {statuses.map(s => (
            <StatusCard key={s.id} status={s} />
          ))}       
        </Grid>
      </Container>
    </Loading>
  )
}
