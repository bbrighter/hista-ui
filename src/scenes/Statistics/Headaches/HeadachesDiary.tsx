import Box from '@mui/material/Box'
import { useEffect } from 'react'

import useHista from '../../../store/store'
import { HeadacheDownloadButton, HeadacheGrid } from './components'

export function HeadacheDiary() {
  const getHeadaches = useHista(state => state.getHeadaches)
  useEffect(() => {
    getHeadaches()
  }, [])

  return (
    <Box>
      <HeadacheDownloadButton />
      <HeadacheGrid />
    </Box>
  )
}
