import Box from '@mui/material/Box'
import { useEffect } from 'react'

import useHista from '../../../store/store'
import HeadacheDownloadButton from './Headaches/HeadacheDownloadButton'
import HeadacheGrid from './Headaches/HeadacheGrid'

export default function HeadacheDiary() {
    const getHeadaches = useHista(state => state.getHeadaches)
    useEffect(() => {
        getHeadaches()
     }, [getHeadaches])

    return (
        <Box>
            <HeadacheDownloadButton />
            <HeadacheGrid />
        </Box>
    )
}
