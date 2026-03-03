import DeleteIcon from "@mui/icons-material/Delete"
import CircularProgress from "@mui/material/CircularProgress"
import IconButton from "@mui/material/IconButton"
import Input from "@mui/material/Input"
import InputAdornment from "@mui/material/InputAdornment"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"
import { useState } from "react"

import { mealConstants } from "../../../constants"
import useDebounce from "../../../hooks/useDebounce"
import { useDidUpdateEffect } from "../../../hooks/useDidUpdateEffect"
import { Food, FoodCondition, mealService } from "../../../store"

export function FoodItem({ food }: {food: Food}) {
  const [isDeleteLoading, setIsDeleteLoading] = useState<number | undefined>()
  const [isPatchLoading, setIsPatchLoading] = useState<{ id: number, cond: FoodCondition } | undefined>()
  const [amount, setAmount] = useState<number | null>(food.amount ?? null)
  const [isPatchAmountLoading, setIsPatchAmountLoading] = useState<number | undefined>()
  const debouncedInputValue = useDebounce(amount, 1000)

  const onConditionChange = async (foodId: number, value: FoodCondition) => {
    setIsPatchLoading({ id: foodId, cond: value })
    await mealService.patchFoodCondition(foodId, value)
    setIsPatchLoading(undefined)
  }

  useDidUpdateEffect(() => {
    setIsPatchAmountLoading(food.id)
    mealService.patchFoodAmount(food.id, amount).finally(() => {
      setIsPatchAmountLoading(undefined)
    })
  }, [debouncedInputValue])



  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    if (value == "" || value == "0") {
      setAmount(null)
    }
    const numValue = Number(value)
    if (!isNaN(numValue)) {
      setAmount(numValue)
    }
  }

  const onDelete = async (foodId: number) => {
    setIsDeleteLoading(foodId)
    await mealService.deleteFood(foodId)
    setIsDeleteLoading(undefined)
  }

  return (
    <ListItem
      key={food.id}
      secondaryAction={(
        <IconButton
          size="small"
          title="Löschen"
          onClick={() => onDelete(food.id)}
          loading={isDeleteLoading == food.id}
        >
          <DeleteIcon />
        </IconButton>
      )}
    >
      <ListItemText>
        <Typography noWrap>
          {food.ingredientName}
        </Typography>
      </ListItemText>
      <Input 
        data-testid="amount-input"
        sx={{ 
          width: "60px",
          backgroundColor: food.id == isPatchAmountLoading ? "#ffffff30" : "default", 
        }}
        endAdornment={<InputAdornment position="end">g</InputAdornment>}
        inputMode="numeric"
        onKeyDown={(e) => {
          if (
            !/[0-9]/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Delete" &&
            e.key !== "Tab" &&
            e.key !== "Escape" &&
            e.key !== "Enter" &&
            e.key !== "ArrowLeft" &&
            e.key !== "ArrowRight" &&
            e.key !== "ArrowUp" &&
            e.key !== "ArrowDown"
          ) {
            e.preventDefault();
          }
        }}
        type="number"
        value={amount ?? ""}
        onChange={onAmountChange}
      />
      <ToggleButtonGroup
        sx={{ paddingRight: "10px", paddingLeft: "10px" }}
        size="small"
        exclusive
        value={food.condition}
        onChange={(_, v) => {
          const val = v as FoodCondition
          onConditionChange(food.id, val)
        }}
      >
        <ToggleButton value="raw" sx={{ width: "3rem" }} disabled={food.condition == "raw"}>
          {isPatchLoading?.id == food.id && isPatchLoading.cond == "raw" ? <CircularProgress size={20} /> : mealConstants.RAW}
        </ToggleButton>
        <ToggleButton value="cooked" sx={{ width: "3rem" }} disabled={food.condition == "cooked"}>
          {isPatchLoading?.id == food.id && isPatchLoading.cond == "cooked" ? <CircularProgress size={20} /> : mealConstants.COOKED}
        </ToggleButton>
      </ToggleButtonGroup>
    </ListItem>
  )
}
