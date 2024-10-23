import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HotelIcon from '@mui/icons-material/Hotel';
import DebouncedSlider from '../../components/DebouncedSlider';
import { PutStatusParams, Status } from '../../../store/status/status';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Grid2 from '@mui/material/Grid2';
import useHista from '../../../store/store';
import { useDidUpdateEffect } from '../../../hooks/useDidUpdateEffect';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function StatusCard(props: { status: Status }) {
    const updateStatus = useHista(state => state.updateStatus)
    const deleteStatus = useHista(state => state.deleteStatus)
    const [morningFitness, setMorningFitness] = useState(props.status?.morning?.fitness)
    const [morningSleep, setMorningSleep] = useState(props.status?.morning?.sleep)
    const [eveningFitness, setEveningFitness] = useState(props.status?.evening?.fitness)

    const [expanded, setExpanded] = useState(false)


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

    const s = props.status

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

    const handleDelete = () => deleteStatus(props.status.id)

    return (
        <Card
            onClick={() => setExpanded(!expanded)}
            sx={{ margin: '1rem' }}
        >
            <CardHeader
                title={s.date.format('dddd, DD.MM.YYYY')}
                titleTypographyProps={{ variant: 'h6' }}
                action={
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>}
            />
            <Card variant='outlined' >
                <Grid2 container>
                    <Grid2 size={6}>
                        <CardHeader avatar={<LightModeIcon fontSize='large' />} />
                        <CardContent>
                            <HotelIcon sx={{ margin: '4px' }} color={colorMapping(props.status?.morning?.sleep)} />
                            <FitnessCenterIcon sx={{ margin: '4px' }} color={colorMapping(props.status?.morning?.fitness)} />
                            <Collapse in={expanded} onClick={handleCardActionsClick}>
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
                        <CardHeader avatar={<DarkMode fontSize='large' />} />
                        <CardContent>
                            <FitnessCenterIcon sx={{ margin: '4px' }} color={colorMapping(s?.evening?.fitness)} />
                            <Collapse in={expanded} onClick={handleCardActionsClick}>
                                <CardActions>
                                    <DebouncedSlider
                                        min={0}
                                        max={4}
                                        initialValue={s?.evening?.fitness}
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
        </Card >
    )
}