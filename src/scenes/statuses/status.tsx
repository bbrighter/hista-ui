import { useEffect } from 'react'
import useHista from '../../store/store'
import Grid2 from '@mui/material/Grid2'
import AddStatus from './components/AddStatus'
import Container from '@mui/material/Container'
import StatusCard from './components/StatusCard'

export default function Status() {
    const [getStatuses, statuses] = useHista(state => [state.getStatuses, state.statuses])

    useEffect(() => {
        getStatuses()
    }, [])

    return (
        <Container sx={{ padding: '2rem' }}>
            <AddStatus />
            <Grid2 container>
                {statuses.map(s => (
                    <StatusCard key={s.id} status={s} />

                ))}
            </Grid2>
        </Container >
    )

}