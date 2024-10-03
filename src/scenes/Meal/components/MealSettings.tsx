import { CircularProgress, Grid, Skeleton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import useHista from '../../../store/store';
import DateInput from '../../components/DateIpnut';
import { Freshness } from '../../../store/meal/meal';
import DebouncedSlider from '../../components/DebouncedSlider';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { useState } from 'react';

export default function MealSettings() {
    const patchMeal = useHista(state => state.updateMeal)
    const meal = useHista(state => state.meal)

    const setDate = (dateString: string) => patchMeal({ date: dateString })
    const setStressLevel = (stressLevel: number) => patchMeal({ stressLevel: stressLevel })
    const setFreshness = (freshness: Freshness) => patchMeal({ freshness: freshness })
    const setAloneness = (isAlone: boolean) => patchMeal({ isAlone: isAlone })

    const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined)

    const handleToggleOptionChange = async (_: React.MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) => {
        if (value == null) return
        setIsLoading(value)
        await setAloneness(value)
        setIsLoading(undefined)
    }

    return (
        <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
        >
            <Grid item xs={12}>
                {meal.isLoading ?
                    <Skeleton height={'4rem'} variant='rectangular' /> :
                    <DateInput
                        title="Mahlzeit"
                        date={meal.date}
                        onChange={(e) => setDate(e?.toISOString() || new Date().toISOString())}
                    />}
            </Grid>
            <Grid item xs={12}>
                {meal.isLoading ?
                    <Skeleton height={'3rem'} variant='rectangular' /> :
                    <DebouncedSlider
                        key={meal.stressLevel}
                        label="Stress"
                        onChange={setStressLevel}
                        max={4}
                        min={0}
                        colorMapping={colorFromStressLevel}
                        initialValue={meal.stressLevel}
                        iconMapping={iconFromStressLevel}
                    />}
            </Grid>
            <Grid item xs={8}>
                {meal.isLoading ? <Skeleton variant='rectangular' height={'3rem'} /> :
                    <DebouncedSlider
                        key={meal.freshness}
                        label="Frische"
                        onChange={setFreshness}
                        max={2}
                        min={0}
                        colorMapping={colorFromFreshness}
                        initialValue={meal.freshness}
                        iconMapping={iconFromFreshness}
                    />}
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'center' }} >
                {meal.isLoading ?
                    <Skeleton variant='rectangular' height={'3rem'} /> :
                    <ToggleButtonGroup
                        exclusive
                        value={meal.isAlone}
                        onChange={handleToggleOptionChange}
                    >
                        <ToggleButton
                            sx={{ width: '3rem' }}
                            value={true}
                        >
                            {isLoading == true ? <CircularProgress size={20} /> : <PersonIcon />}
                        </ToggleButton>
                        <ToggleButton
                            value={false}
                            sx={{ width: '3rem' }}
                        >
                            {isLoading == false ? <CircularProgress size={20} /> : <PeopleIcon />}
                        </ToggleButton>
                    </ToggleButtonGroup>
                }
            </Grid>
        </Grid>

    )
}


const colorFromStressLevel = (stressLevel: number) => {
    switch (stressLevel) {
    case 0:
        return 'success'
    case 1:
        return 'primary'
    case 2:
        return 'secondary'
    case 3:
        return 'warning'
    default:
        return 'error'
    }
}

const iconFromStressLevel = (stressLevel: number): JSX.Element => {
    switch (stressLevel) {
    case 0:
        return <MoodIcon fontSize="large" color='success' />
    case 1:
        return <SentimentSatisfiedIcon fontSize="large" color='primary' />
    case 2:
        return <SentimentNeutralIcon fontSize="large" color='secondary' />
    case 3:
        return <SentimentDissatisfiedIcon fontSize="large" color='warning' />
    default:
        return <MoodBadIcon fontSize="large" color='error' />
    }
}

const colorFromFreshness = (freshness: Freshness) => {
    switch (freshness) {
    case Freshness.fresh:
        return 'success'
    case Freshness.sameDay:
        return 'primary'
    case Freshness.old:
        return 'error'
    }
}

const iconFromFreshness = (freshness: Freshness) => {
    switch (freshness) {
    case Freshness.fresh:
        return <LunchDiningIcon color='success' />
    case Freshness.sameDay:
        return <LunchDiningIcon color='primary' />
    case Freshness.old:
        return <LunchDiningIcon color='error' />
    }
}

