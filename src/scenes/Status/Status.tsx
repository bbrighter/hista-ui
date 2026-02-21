import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Skeleton from "@mui/material/Skeleton"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

import { statusService, useStatus } from "../../store"
import { AddStatus, StatusCard } from "./components"

export default function Status() {
  const statuses = useStatus()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    statusService.getStatuses().finally(() => setIsLoading(false))
  }, [])

  return (
    <Container sx={{ padding: "2rem" }}>
      <AddStatus disabled={isLoading} />
      <Grid container>
        {isLoading
          ? (
            <>
              {[{ id: 1, date: dayjs() }, { id: 2, date: dayjs() }, { id: 3, date: dayjs() }].map(s =>
                (
                  <Skeleton key={s.id}><StatusCard status={s} /></Skeleton>
                ))}
            </>
          )

          : (
            <>
              {statuses.map(s => (
                <StatusCard key={s.id} status={s} />

              ))}
            </>
          )}
      </Grid>
    </Container>
  )
}
