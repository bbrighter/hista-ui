import Box from '@mui/material/Box';
import { useEffect } from 'react';

import useHista from '../../../store/store';
import DiaryDownloadButton from './DiaryDownloadButton';
import DiaryGrid from './DiaryGrid';

export default function Diary() {
    const getDiaryEntries = useHista(state => state.getDiaryEntries)

    useEffect(() => { getDiaryEntries() }, [getDiaryEntries])


    return (
        <Box>
            <DiaryDownloadButton />
            <DiaryGrid />
        </Box>
    )
}