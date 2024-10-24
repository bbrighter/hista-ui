import { useState } from 'react'
import { PutStatusParams, Status } from '../../../store/status/status'
import useHista from '../../../store/store'
import { useDidUpdateEffect } from '../../../hooks/useDidUpdateEffect'
import Card from '@mui/material/Card'
import Grid2 from '@mui/material/Grid2'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import CardActions from '@mui/material/CardActions'
import DebouncedSlider from '../../components/DebouncedSlider'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HotelIcon from '@mui/icons-material/Hotel';

export default function StatusCardContent(props: {
    status: Status,
    expanded: boolean
}) {
    const updateStatus = useHista(state => state.updateStatus)
    const [morningFitness, setMorningFitness] = useState(props.status?.morning?.fitness)
    const [morningSleep, setMorningSleep] = useState(props.status?.morning?.sleep)
    const [eveningFitness, setEveningFitness] = useState(props.status?.evening?.fitness)

    useDidUpdateEffect(() => {
        const params: PutStatusParams = {
            date: props.status.date,
            fitness: morningFitness,
            statusId: props.status.id,
            timeOfDay: 'morning',
            sleep: morningSleep,
            morningOrEveningId: props.status?.morning?.id,
        }
        updateStatus(params)


    }, [morningFitness, morningSleep])

    useDidUpdateEffect(() => {
        const params: PutStatusParams = {
            date: props.status.date,
            fitness: eveningFitness,
            statusId: props.status.id,
            timeOfDay: 'evening',
            morningOrEveningId: props.status?.evening?.id,
        }
        updateStatus(params)

    }, [eveningFitness])

    const handleCardActionsClick = (event: React.MouseEvent) => {
        event.stopPropagation()
    }

    const colorMapping = (v: number | undefined) => {
        switch (v) {
            case 0:
                return 'error'
            case 1:
                return 'warning'
            case 2:
                return 'info'
            case 3:
                return 'primary'
            case 4:
                return 'success'
            default:
                return
        }
    }

    const handleMorningFitnessChange = (v: number) => {
        if (v) setMorningFitness(v)
    }

    const handleMorningSleepChange = (v: number) => {
        if (v) setMorningSleep(v)
    }

    const handleEveningFitnessChange = (v: number) => {
        if (v) setEveningFitness(v)
    }

    return (
        <Card variant='elevation' >
            <Grid2 container>
                <Grid2 size={6}>
                    <CardHeader avatar={<LightModeIcon />} sx={{ padding: '8px' }} />
                    <CardContent>
                        <HotelIcon sx={{ margin: '4px' }} color={colorMapping(props.status?.morning?.sleep)} />
                        <FitnessCenterIcon sx={{ margin: '4px' }} color={colorMapping(props.status?.morning?.fitness)} />
                        <Collapse in={props.expanded} onClick={handleCardActionsClick}>
                            <CardActions>
                                <Grid2 container>
                                    <Grid2 size={12}>
                                        <DebouncedSlider
                                            min={0}
                                            max={4}
                                            initialValue={props.status?.morning?.sleep}
                                            onChange={handleMorningSleepChange}
                                            label={'Schlaf'}
                                            colorMapping={colorMapping}
                                        />
                                    </Grid2>
                                    <Grid2 size={12}>
                                        <DebouncedSlider
                                            min={0}
                                            max={4}
                                            initialValue={props.status?.morning?.fitness}
                                            onChange={handleMorningFitnessChange}
                                            label={'Fitness'}
                                            colorMapping={colorMapping}
                                        />
                                    </Grid2>
                                </Grid2>
                            </CardActions>
                        </Collapse>
                    </CardContent>
                </Grid2>
                <Grid2 size={6}>
                    <CardHeader avatar={<DarkMode />} sx={{ padding: '8px' }} />
                    <CardContent>
                        <FitnessCenterIcon sx={{ margin: '4px' }} color={colorMapping(props.status?.evening?.fitness)} />
                        <Collapse in={props.expanded} onClick={handleCardActionsClick}>
                            <CardActions>
                                <DebouncedSlider
                                    min={0}
                                    max={4}
                                    initialValue={props.status?.evening?.fitness}
                                    onChange={handleEveningFitnessChange}
                                    label={'Fitness'}
                                    colorMapping={colorMapping}
                                />
                            </CardActions>
                        </Collapse>
                    </CardContent>
                </Grid2>
            </Grid2>
        </Card>
    )
}