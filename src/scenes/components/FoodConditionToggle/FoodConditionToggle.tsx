import Button from "@mui/material/Button"

import { mealConstants } from "../../../constants"
import { FoodCondition } from "../../../store"

export const FoodConditionToggle = ({ condition, onClick }:{ condition: FoodCondition, onClick: () => void }) => {

  return (
    <Button 
      data-testid="food-condition-chip"
      sx={{ ml: "4px", 
        borderColor: (theme) => condition == "raw" ? theme.palette.primary.main : theme.palette.secondary.main , 
        color: (theme) => theme.palette.grey[500],
      }}
      variant="outlined"
      onClick={onClick}
    >
      {condition == "raw" ? mealConstants.RAW : mealConstants.COOKED}
    </Button>
  )
}
