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

    const getColor = (value: number): string => {
        // Define color stops: green (low), yellow (medium), red (high)
        const colors = [
            { r: 0, g: 255, b: 0 },   // Green (0)
            { r: 255, g: 255, b: 0 }, // Yellow (5)
            { r: 255, g: 0, b: 0 },    // Red (10)
        ];

        const max = 10
        const mid = max / 2 // Midpoint for yellow transition

        let r: number, g: number, b: number

        if (value <= mid) {
            // Interpolate from green to yellow
            const ratio = value / mid;
            r = Math.round(colors[0].r + ratio * (colors[1].r - colors[0].r));
            g = Math.round(colors[0].g + ratio * (colors[1].g - colors[0].g));
            b = Math.round(colors[0].b + ratio * (colors[1].b - colors[0].b));
        } else {
            // Interpolate from yellow to red
            const ratio = (value - mid) / mid;
            r = Math.round(colors[1].r + ratio * (colors[2].r - colors[1].r));
            g = Math.round(colors[1].g + ratio * (colors[2].g - colors[1].g));
            b = Math.round(colors[1].b + ratio * (colors[2].b - colors[1].b));
        }

        return `rgb(${r}, ${g}, ${b})`;
    };

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
            <HeadachePositionsButtons />
            <HeadacheTypesButtons />
            <HeadacheSymptomsButtons />
        </Container>
    )
}