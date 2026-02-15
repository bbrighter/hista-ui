import DeleteIcon from "@mui/icons-material/Delete"
import CircularProgress from "@mui/material/CircularProgress"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"
import { useState } from "react"

import { mealConstants } from "../../../constants"
import { FoodCondition } from "../../../store/meal/food"
import useHista from "../../../store/store"

export default function FoodList() {
  const food = useHista(state => state.meal.foods)
  const patchFoodCondition = useHista(state => state.patchFoodCondition)
  const deleteFood = useHista(state => state.deleteFood)

  const [isDeleteLoading, setIsDeleteLoading] = useState<number | undefined>()
  const [isPatchLoading, setIsPatchLoading] = useState<{ id: number, cond: FoodCondition } | undefined>()

  const onChange = async (foodId: number, value: FoodCondition) => {
    setIsPatchLoading({ id: foodId, cond: value })
    await patchFoodCondition(foodId, value)
    setIsPatchLoading(undefined)
  }

  const onDelete = async (foodId: number) => {
    setIsDeleteLoading(foodId)
    await deleteFood(foodId)
    setIsDeleteLoading(undefined)
  }

  return (
    <List>
      {food.map(f => (
        <ListItem
          key={f.id}
          secondaryAction={(
            <IconButton
              title="Löschen"
              onClick={() => onDelete(f.id)}
              loading={isDeleteLoading == f.id}
            >
              <DeleteIcon />
            </IconButton>
          )}
        >
          <ListItemText>
            <Typography noWrap>
              {f.ingredientName}
            </Typography>
          </ListItemText>
          <ToggleButtonGroup
            sx={{ paddingRight: "10px", paddingLeft: "10px" }}
            size="small"
            exclusive
            value={f.condition}
            onChange={(_, v) => {
              const val = v as FoodCondition
              onChange(f.id, val)
            }}
          >
            <ToggleButton value="raw" sx={{ width: "3rem" }} disabled={f.condition == "raw"}>
              {isPatchLoading?.id == f.id && isPatchLoading.cond == "raw" ? <CircularProgress size={20} /> : mealConstants.RAW}
            </ToggleButton>
            <ToggleButton value="cooked" sx={{ width: "3rem" }} disabled={f.condition == "cooked"}>
              {isPatchLoading?.id == f.id && isPatchLoading.cond == "cooked" ? <CircularProgress size={20} /> : mealConstants.COOKED}
            </ToggleButton>
          </ToggleButtonGroup>
        </ListItem>
      ))}
    </List>
  )
}
