import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

import { medicinesService } from "../../../store"

type IntakeListProp = {
  id: number
  name: string
  count: number
  isOld?: boolean
  isArchived?: boolean
}

export const IntakeListItem = ({ id, name, count, isOld, isArchived }: IntakeListProp) => {
  const decreaseIsDisabled = count == 0

  const onIncrease = () =>    medicinesService.incrementIntake(id)
  const onDecrease = () =>    medicinesService.decrementIntake(id)

  const secondaryAction = isOld ? (<></>) : (
    <ButtonGroup>
      <Button 
        data-testid="increaseButton"
        onClick={onIncrease}>+</Button>
      <Button 
        disabled={decreaseIsDisabled} 
        onClick={onDecrease}
        data-testid="decreaseButton"
      >-</Button>
    </ButtonGroup>
  )

  return (
    <ListItem secondaryAction={secondaryAction   }>
      <ListItemText 
        sx={isArchived ? { color: "gray" } : {}}
        primary={name} 
        secondary={count}/> 
    </ListItem>
  )
}