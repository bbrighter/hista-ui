import { Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { Dayjs } from 'dayjs'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useHista from '../../store/store'
import DateInput from '../components/DateIpnut'
import DebouncedSlider from '../components/DebouncedSlider'
import { getColor } from './components/colorMapping'
import HeadacheDescription from './components/HeadacheDescription'
import HeadachePositionsButtons from './components/HeadachePositions'
import HeadacheSymptomsButtons from './components/HeadacheSymptoms'
import HeadacheTypesButtons from './components/HeadacheTypes'

export default function Headache() {
    const params = useParams<{ id: string }>()
    const headache = useHista(state => state.headache)
    const getHeadache = useHista(state => state.getHeadache)
    const patchSeverity = useHista(state => state.patchHeadacheSeverity)
    const patchDate = useHista(state => state.patchHeadacheDate)


    useEffect(() => {
        getHeadache(Number(params.id))
    }, [params.id])

    const onSeverityChange = (v: number) => {
        if (v != headache.severity) {
            patchSeverity(v)
        }
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
                min={0}
                max={10}
                colorMapping={getColor}
                iconMapping={iconMapping}
            />
            <HeadachePositionsButtons />
            <HeadacheTypesButtons />
            <HeadacheSymptomsButtons />
            <HeadacheDescription />
        </Container>
    )
}