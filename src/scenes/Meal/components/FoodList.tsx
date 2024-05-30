import { IconButton, List, ListItem, ListItemText, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import useHista from "../../../store/store";
import { mealConstants } from "../../../constants";
import { FoodCondition } from "../../../store/meal/food";

export default function FoodList() {
    const food = useHista(state => state.meal.foods)
    const patchFoodCondition = useHista(state => state.patchFoodCondition)
    const deleteFood = useHista(state => state.deleteFood)

    const onChange = async (foodId: number, value: FoodCondition) => {
        await patchFoodCondition(foodId, value)
    }

    const onDelete = async (foodId: number) => {
        await deleteFood(foodId)
    }

    return (
        <List>
            {food.map(f => (
                <ListItem key={f.id}
                    secondaryAction={
                        <IconButton onClick={() => onDelete(f.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                    <ListItemText>
                        <Typography noWrap >
                            {f.ingredientName}
                        </Typography>
                    </ListItemText>
                    <ToggleButtonGroup
                        sx={{ paddingRight: '10px', paddingLeft: '10px' }}
                        size="small"
                        exclusive
                        value={f.condition}
                        onChange={(_, v) => {
                            const val = v as FoodCondition
                            onChange(f.id, val)
                        }}>
                        <ToggleButton value='raw'>
                            {mealConstants.RAW}
                        </ToggleButton>
                        <ToggleButton value='cooked'>
                            {mealConstants.COOKED}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </ListItem>))}
        </List>
    )
}