import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'

import useHista from '../../store/store'
import PollenGrid from './components/PollenGrid'


export default function Pollens() {
    const getPollens = useHista(state => state.getPollens)
    const pollensAreLoaded = useHista(state => state.pollensAreLoaded)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!pollensAreLoaded) {
            setIsLoading(true)
            getPollens().
                finally(() => setIsLoading(false))
        }
    }, [getPollens, pollensAreLoaded])

    return (
        <Container sx={{ padding: 2 }}>
            <PollenGrid loading={isLoading} />
        </Container >
    )
}
