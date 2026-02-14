import Box from '@mui/material/Box'
import { useEffect } from 'react'

import { statisticsService } from '../../../store'
import { DiaryDownloadButton, DiaryGrid } from './components'

export function Diary() {
  useEffect(() => {
    statisticsService.getDiaries()
  }, [])

  return (
    <Box>
      <DiaryDownloadButton />
      <DiaryGrid />
    </Box>
  )
}
