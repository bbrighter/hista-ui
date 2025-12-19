import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import { Theme } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import { FIRST_COLUMN_WIDTH, POLLEN_TYPES } from './pollen_helper'

export default function PollenHeader() {
    const isLarge = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
    return (
        <ListItem>
            <Paper sx={{ width: FIRST_COLUMN_WIDTH }} />
            {POLLEN_TYPES.map(({ key, label, icon }) => (
                <Paper
                  key={key}
                  sx={{ width: 'max(10%, 20px)' }}
                >
                    {!isLarge && <SvgIcon component={icon} inheritViewBox color="action" />}
                    {isLarge && (
                        <Typography noWrap>
                            {label}
                            {' '}
                        </Typography>
                    )}
                </Paper>
            ),
            )}
        </ListItem>
    )
}
