import DarkMode from "@mui/icons-material/DarkMode"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import HotelIcon from "@mui/icons-material/Hotel"
import LightModeIcon from "@mui/icons-material/LightMode"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Grid from "@mui/material/Grid"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import debounce from "lodash.debounce"
import { useRef, useState } from "react"

import { useDidUpdateEffect } from "../../../hooks/useDidUpdateEffect"
import { PutStatusParams, Status, statusService } from "../../../store"

export default function StatusCardContent(props: {
  status: Status
  expanded: boolean
}) {
  const [morningFitness, setMorningFitness] = useState<number | undefined>(props.status.morningFitness)
  const [morningSleep, setMorningSleep] = useState<number | undefined>(props.status.morningSleep)
  const [eveningFitness, setEveningFitness] = useState<number | undefined>(props.status.eveningFitness)

  const debouncedUpdate = useRef(debounce(async (params) => {
    await statusService.patchStatus(props.status.id, params)
  }, 1000)).current

  useDidUpdateEffect(() => {
    const params: PutStatusParams = {
      date: props.status.date,
      statusId: props.status.id,
      morningFitness: morningFitness,
      eveningFitness: eveningFitness,
      morningSleep: morningSleep,
    }
    debouncedUpdate(params)
  }, [morningFitness, morningSleep, eveningFitness])

  const colorMapping = (v: number | undefined): string => {
    const colors = ["rgb(255, 0, 0)", "rgb(255, 128, 0)", "rgb(255, 255, 0)", "rgb(99, 199, 0)", "rgb(0, 131, 0)"]
    return v == undefined ? "rgb(160, 160, 160)" : colors[v - 1]
  }

  const SleepIcon = () => {
    return <HotelIcon sx={{ margin: "4px", color: colorMapping(morningSleep) }} titleAccess="Schlaf" />
  }
  const FitnessIcon = (props: { fitness?: number }) => {
    return <FitnessCenterIcon sx={{ margin: "4px", color: colorMapping(props.fitness) }} titleAccess="Fitness" />
  }

  return (
    <Card variant="elevation">
      <Grid container>
        <Grid size={12}>
          <CardHeader
            title={<Typography>Morgens</Typography>}
            avatar={<LightModeIcon />}
            sx={{ padding: "8px" }}
          />
          <CardContent>
            <CardActions>
              <Grid size={12}>
                <Grid size={12} sx={{ mb: 2 }}>
                  <Stack spacing={2} direction="row">
                    <SleepIcon />
                    <Slider
                      min={1}
                      max={5}
                      value={morningSleep}
                      onChange={(_, v) => setMorningSleep(v)}
                      // color={colorMapping(morningSleep)}
                      sx={{ color: colorMapping(morningSleep) }}
                    />
                  </Stack>

                </Grid>
                <Grid size={12}>
                  <Stack spacing={2} direction="row">
                    <FitnessIcon fitness={morningFitness} />
                    <Slider
                      min={1}
                      max={5}
                      value={morningFitness}
                      onChange={(_, v) => setMorningFitness(v)}
                      // color={colorMapping(morningFitness)}
                      sx={{ color: colorMapping(morningFitness) }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </CardActions>
          </CardContent>
        </Grid>
        <Grid size={12}>
          <CardHeader
            title={<Typography>Abends</Typography>}
            avatar={<DarkMode />}
            sx={{ padding: "8px" }}
          />
          <CardContent>
            <CardActions>
              <Grid size={12}>
                <Stack spacing={2} direction="row">
                  <FitnessIcon fitness={eveningFitness} />
                  <Slider
                    min={1}
                    max={5}
                    value={eveningFitness}
                    onChange={(_, v) => setEveningFitness(v)}
                    // color={colorMapping(eveningFitness)}
                    sx={{ color: colorMapping(eveningFitness) }}
                  />
                </Stack>
              </Grid>
            </CardActions>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}
