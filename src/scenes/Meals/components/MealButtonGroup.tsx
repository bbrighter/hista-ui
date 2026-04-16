import Stack from "@mui/material/Stack"

import { AddMealButton } from "./AddMealButton"
import { ManageIngredientsButton } from "./ManageIngredientsButton"
import { ManageTemplatesButton } from "./ManageTemplatesButton"

export const MealButtonGroup = () => {
  return (
    <Stack direction="row" spacing={2}>
      <AddMealButton/>
      <ManageIngredientsButton/>
      <ManageTemplatesButton/>
    </Stack>
  )
}