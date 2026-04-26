import { NumberFieldRootChangeEventDetails } from "@base-ui/react/number-field"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { SwipeableListItem } from "react-swipeable-list"

import useDebounce from "../../../hooks/useDebounce"
import { useDidUpdateEffect } from "../../../hooks/useDidUpdateEffect"
import { Food, mealService } from "../../../store"
import { FoodConditionToggle } from "../../components"
import NumberField from "../../components/NumberField"
import { swipeDeleteFood } from "./SwipeFoodActions"

type FoodItemType = Food & {ingredientName: string}

export function FoodItem({ food }: {food: FoodItemType}) {
  const [amount, setAmount] = useState<number | null>(food.amount ?? null)
  const [isPatchAmountLoading, setIsPatchAmountLoading] = useState<number | undefined>()
  const debouncedInputValue = useDebounce(amount, 1000)


  useDidUpdateEffect(() => {
    setIsPatchAmountLoading(food.id)
    mealService.patchFoodAmount(food.id, amount ?? 0).finally(() => {
      setIsPatchAmountLoading(undefined)
    })
  }, [debouncedInputValue])


  const onAmountChange = (value: number | null, eventDetails: NumberFieldRootChangeEventDetails) => {
    if (eventDetails.reason == "input-clear") {
      setAmount(null)
    } else {
      setAmount(value)
    }
  }


  const onConditionClick = () => {
    mealService.patchFoodCondition(food.id, food.condition == "raw" ? "cooked" : "raw")
  }

  return (
    <SwipeableListItem 
      threshold={0.5}
      trailingActions={swipeDeleteFood(food)}
    >
      <ListItem sx={{ pl: "8px", pr: "8px" }}>
        <ListItemText>
          <Typography noWrap>
            {food.ingredientName}
          </Typography>
        </ListItemText>
        <NumberField
          sx={{ width: "50px" }}
          size="small"
          unit="g"
          min={0}
          value={amount}
          onValueChange={onAmountChange}       
          loading={isPatchAmountLoading == food.id}        
        />
        <FoodConditionToggle condition={food.condition} onClick={onConditionClick}/>
      </ListItem>
    </SwipeableListItem>
  )
}


