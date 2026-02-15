/// <reference types="vite-plugin-svgr/client" />
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Skeleton from '@mui/material/Skeleton'
import { useEffect, useState } from 'react'

import useHista from '../../store/store'
import PollenHeader from './components/PollenHeader'
import PollenRow from './components/PollenRow'

export default function PollenView() {
  const getPollens = useHista(state => state.getPollens)
  const pollens = useHista(state => state.pollens)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getPollens().finally(() => setIsLoading(false))
  }, [getPollens])

  return (
    <Container sx={{ padding: 2 }}>
      <PollenHeader />
      <Divider />
      <List>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="calc(max(20%, 100px) + 8 * max(10%, 20px))"
              height="1.5rem"
              sx={{ marginTop: 2 }}
            />
          ))
          : pollens.map((pollen, i) =>
            <PollenRow key={i} pollen={pollen} />,
          )}
      </List>
    </Container>
  )
}
