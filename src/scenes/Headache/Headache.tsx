import { useParams } from 'react-router-dom'
import useHista from '../../store/store'
import { useEffect, useRef } from 'react'
import DebouncedSlider from '../components/DebouncedSlider'
import Container from '@mui/material/Container'
import DateInput from '../components/DateIpnut'
import { Dayjs } from 'dayjs'
import HeadachePositionsButtons from './components/HeadachePositions'
import HeadacheTypesButtons from './components/HeadacheTypes'
import HeadacheSymptomsButtons from './components/HeadacheSymtpoms'
import { getColor } from './components/colorMapping'

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
                max={10}
                colorMapping={getColor}
            />
            {/* <Box sx={{ width: '100%', backgroundColor: 'red' }}> */}

            <HeadachePositionsButtons />
            <HeadacheTypesButtons />
            <HeadacheSymptomsButtons />
            {/* </Box> */}
        </Container>
    )
}