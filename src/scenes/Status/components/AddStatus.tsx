import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import dayjs from 'dayjs'
import { useState } from 'react'

import useHista from '../../../store/store'

export default function AddStatus(props: { disabled: boolean }) {
    const addStatus = useHista(state => state.addStatus)
    const statuses = useHista(state => state.statuses)

    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const today = dayjs()
    const yesterday = today.subtract(1, 'day')
    const dayBeforeYesterday = today.subtract(2, 'day')

    const todaysStatusExists = statuses.find(s => s.date.isSame(today, 'day')) != undefined
    const yesterdaysStatusExists = statuses.find(s => s.date.isSame(yesterday, 'day')) != undefined
    const dayBeforeYesterdaysStatusExists = statuses.find(s => s.date.isSame(dayBeforeYesterday, 'day')) != undefined

    const handleClickToday = () => addStatus(today)
    const handleClickYesterday = () => {
        addStatus(yesterday)
        closeMenu()
    }
    const handleClickDayBeforeYesterday = () => {
        addStatus(dayBeforeYesterday)
        closeMenu()
    }

    const handleClickCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true)
        setAnchorEl(event.currentTarget)
    }

    const closeMenu = () => {
        setOpen(false)
        setAnchorEl(null)
    }

    return (
        <>
            <ButtonGroup>
                <Button
                  variant="contained"
                  onClick={handleClickToday}
                  disabled={todaysStatusExists || props.disabled}
                  title="Heutigen Status hinzufügen"
                >
                    + Status heute
                </Button>
                <Button
                  onClick={handleClickCalendar}
                  disabled={props.disabled}
                  title="Status hinzufügen"
                >
                    <CalendarMonthIcon />
                </Button>
            </ButtonGroup>
            <Menu
              open={open}
              onClose={closeMenu}
              anchorEl={anchorEl}
            >
                <MenuItem
                  disabled={yesterdaysStatusExists}
                  onClick={handleClickYesterday}
                >
Gestern
                </MenuItem>
                <MenuItem
                  disabled={dayBeforeYesterdaysStatusExists}
                  onClick={handleClickDayBeforeYesterday}
                >
Vorgestern
                </MenuItem>
                {/* <MenuItem>Anderer Tag</MenuItem> */}
            </Menu>
        </>
    )
}
