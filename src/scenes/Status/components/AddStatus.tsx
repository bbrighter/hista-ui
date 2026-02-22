import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import dayjs from "dayjs"
import { useState } from "react"

import { statusService, useStatusExistsOnDay } from "../../../store"

export function AddStatus(props: { disabled: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const today = dayjs()
  const yesterday = today.subtract(1, "day")
  const dayBeforeYesterday = today.subtract(2, "day")

  const todaysStatusExists = useStatusExistsOnDay(today)
  const yesterdaysStatusExists = useStatusExistsOnDay(yesterday)
  const dayBeforeYesterdaysStatusExists = useStatusExistsOnDay(dayBeforeYesterday)

  const handleClickToday = () => statusService.postStatus(today)
  const handleClickYesterday = () => {
    statusService.postStatus(yesterday)
    closeMenu()
  }
  const handleClickDayBeforeYesterday = () => {
    statusService.postStatus(dayBeforeYesterday)
    closeMenu()
  }

  const handleClickCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
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
      </Menu>
    </>
  )
}
