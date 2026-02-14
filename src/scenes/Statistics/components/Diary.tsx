import Box from '@mui/material/Box'
import { useEffect } from 'react'

import useHista from '../../../store/store'
import DiaryDownloadButton from './Diary/DiaryDownloadButton'
import DiaryGrid from './Diary/DiaryGrid'

export function Diary() {
    const getDiaryEntries = useHista(state => state.getDiaryEntries)

    useEffect(() => {
        getDiaryEntries()
     }, [getDiaryEntries])

    return (
        <Box>
            <DiaryDownloadButton />
            <DiaryGrid />
        </Box>
    )
}
