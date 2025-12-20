import DeleteIcon from '@mui/icons-material/Delete'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'

import { Status } from '../../../store/status/status'
import useHista from '../../../store/store'
import { formatDate } from '../../../utils/formatDate'
import StatusCardContent from './StatusCardContent'

export default function StatusCard(props: { status: Status }) {
    const deleteStatus = useHista(state => state.deleteStatus)
    const [expanded, setExpanded] = useState(false)

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    let cardWidth = '100%'
    if (isSmallScreen) {
        cardWidth = '100%'
    }
    else if (isMediumScreen) {
        cardWidth = '45%'
    }
    else {
        cardWidth = '30%'
    }

    const handleDelete = () => deleteStatus(props.status.id)

    return (
        <Card
          onClick={() => setExpanded(!expanded)}
          variant="outlined"
          sx={{
                marginTop: '0.5rem',
                marginRight: '0.5rem',
                width: cardWidth,
            }}
        >
            <CardHeader
              sx={{ padding: '12px' }}
              title={formatDate(props.status.date)}
              slotProps={{ title: { variant: 'overline' } }}
              action={(
                    <IconButton onClick={handleDelete} size="small" title="Löschen">
                        <DeleteIcon />
                    </IconButton>
                )}
            />
            <StatusCardContent status={props.status} expanded={expanded} />
        </Card>
    )
}
