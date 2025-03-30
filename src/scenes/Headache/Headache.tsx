import { useParams } from 'react-router-dom'
import useHista from '../../store/store'
import { useEffect, useRef } from 'react'
import DebouncedSlider from '../components/DebouncedSlider'
import Container from '@mui/material/Container'
import DateInput from '../components/DateIpnut'
import { Dayjs } from 'dayjs'
import HeadachePositionsButtons from './components/HeadachePositions'
import HeadacheTypesButtons from './components/HeadacheTypes'
import HeadacheSymptomsButtons from './components/HeadacheSymptoms'
import { getColor } from './components/colorMapping'
import { Typography } from '@mui/material'

export default function Headache() {
    const isFirstRender = useRef(true);
    const params = useParams<{ id: string }>()
    const headache = useHista(state => state.headache)
    const getHeadache = useHista(state => state.getHeadache)
    const patchSeverity = useHista(state => state.patchHeadacheSeverity)
    const patchDate = useHista(state => state.patchHeadacheDate)

    useEffect(() => {
        getHeadache(Number(params.id))
    }, [])

    const onSeverityChange = (v: number) => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        patchSeverity(v)
    }

    const onDateChange = (v: Dayjs) => {
        patchDate(v.toDate())
    }

    const iconMapping = (value: number) => {
        return (
            <Typography sx={{
                borderRadius: '50%',
                width: '2rem', height: '2rem',
                backgroundColor: getColor(value), color: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
            }}>{value}</Typography>

        )
    }

    return (
        <Container sx={{ padding: '2rem' }}>
            <DateInput
                title={'Datum'}
                date={headache.date}
                onChange={onDateChange} />
            <DebouncedSlider
                initialValue={headache.severity}
                onChange={onSeverityChange}
                label={'Schwere'}
                min={1}
                max={10}
                colorMapping={getColor}
                iconMapping={iconMapping}
            />
            <HeadachePositionsButtons />
            <HeadacheTypesButtons />
            <HeadacheSymptomsButtons />
        </Container>
    )
}