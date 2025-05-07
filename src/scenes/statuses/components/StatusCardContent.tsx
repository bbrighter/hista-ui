import { useRef, useState } from 'react'
import { PutStatusParams, Status } from '../../../store/status/status'
import useHista from '../../../store/store'
import { useDidUpdateEffect } from '../../../hooks/useDidUpdateEffect'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HotelIcon from '@mui/icons-material/Hotel';
import Grid from '@mui/material/Grid'
import debounce from 'lodash.debounce'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

export default function StatusCardContent(props: {
    status: Status,
    expanded: boolean
}) {
    const updateStatus = useHista(state => state.updateStatus)
    const [morningFitness, setMorningFitness] = useState<number | undefined>(props.status.morningFitness)
    const [morningSleep, setMorningSleep] = useState<number | undefined>(props.status.morningSleep)
    const [eveningFitness, setEveningFitness] = useState<number | undefined>(props.status.eveningFitness)
    const [isLoading, setIsLoading] = useState(false)

    const debouncedUpdate = useRef(debounce(async (params) => {
        setIsLoading(true)
        await updateStatus(params)
        setIsLoading(false)
    }, 1000)).current

    useDidUpdateEffect(() => {
        const params: PutStatusParams = {
            statusId: props.status.id,
            morningFitness: morningFitness,
            eveningFitness: eveningFitness,
            morningSleep: morningSleep,
        }
        debouncedUpdate(params)
    }, [morningFitness, morningSleep, eveningFitness])


    type MuiColor = 'error' | 'warning' | 'info' | 'primary' | 'success'
    const colorMapping = (v: number | undefined): MuiColor => {
        const colors: readonly MuiColor[] = ['error', 'warning', 'info', 'primary', 'success']
        return colors[v - 1]
    }

    const SleepIcon = () => {
        return <HotelIcon sx={{ margin: '4px' }} color={colorMapping(morningSleep)} titleAccess='Schlaf' />
    }
    const FitnessIcon = (props: { fitness?: number }) => {
        return <FitnessCenterIcon sx={{ margin: '4px' }} color={colorMapping(props.fitness)} titleAccess='Fitness' />
    }

    return (
        <Card variant='elevation' >
            <Grid container>
                <Grid size={6}>
                    <CardHeader
                        title={<Typography>Morgens</Typography>}
                        avatar={
                            isLoading ?
                                <CircularProgress size='1rem' /> :
                                <LightModeIcon />
                        }
                        sx={{ padding: '8px' }}
                    />
                    <CardContent>
                        <CardActions>
                            <Grid size={12}>
                                <Grid size={12}>
                                    <Stack spacing={2} direction='row'>
                                        <SleepIcon />
                                        <Slider
                                            min={1}
                                            max={5}
                                            value={morningSleep}
                                            onChange={(_, v) => setMorningSleep(v)}
                                            color={colorMapping(morningSleep)}
                                        />
                                    </Stack>

                                </Grid>
                                <Grid size={12}>
                                    <Stack spacing={2} direction='row'>
                                        <FitnessIcon fitness={morningFitness} />
                                        <Slider
                                            min={1}
                                            max={5}
                                            value={morningFitness}
                                            onChange={(_, v) => setMorningFitness(v)}
                                            color={colorMapping(morningFitness)}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </CardContent>
                </Grid>
                <Grid size={6}>
                    <CardHeader
                        title={<Typography>Abends</Typography>}
                        avatar={
                            isLoading ?
                                <CircularProgress size='1rem' /> :
                                <DarkMode />}
                        sx={{ padding: '8px' }}
                    />
                    <CardContent>

                        <CardActions>
                            <Grid size={12}>
                                <Stack spacing={2} direction='row'>
                                    <FitnessIcon fitness={eveningFitness} />
                                    <Slider
                                        min={1}
                                        max={5}
                                        value={eveningFitness}
                                        onChange={(_, v) => setEveningFitness(v)}
                                        color={colorMapping(eveningFitness)}
                                    />
                                </Stack>
                            </Grid>
                        </CardActions>
                    </CardContent>
                </Grid>
            </Grid>
        </Card >
    )
}