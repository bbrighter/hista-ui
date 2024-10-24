import { useEffect, useState } from 'react'
import useHista from '../../store/store'
import Grid2 from '@mui/material/Grid2'
import AddStatus from './components/AddStatus'
import Container from '@mui/material/Container'
import StatusCard from './components/StatusCard'

import dayjs from 'dayjs'
import Skeleton from '@mui/material/Skeleton'


export default function Status() {
    const [getStatuses, statuses] = useHista(state => [state.getStatuses, state.statuses])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getStatuses().finally(() => setIsLoading(false))
    }, [])

    return (
        <Container sx={{ padding: '2rem' }}>
            <AddStatus disabled={isLoading} />
            <Grid2 container>
                {isLoading ?
                    <>
                        {[{ id: 1, date: dayjs() }, { id: 2, date: dayjs() }, { id: 3, date: dayjs() }].map(s =>
                        (
                            <Skeleton key={s.id}><StatusCard status={s} /></Skeleton>
                        ))}
                    </>

                    : <>{statuses.map(s => (
                        <StatusCard key={s.id} status={s} />

                    ))
                    }</>
                }
            </Grid2>
        </Container >
    )

}