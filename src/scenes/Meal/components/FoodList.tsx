import { FormControlLabel, IconButton, List, ListItem, ListItemText, Radio, RadioGroup } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import useHista from "../../../store/store";
import { FoodCondition } from "../../../store/meal";

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
                        {f.ingredient}
                    </ListItemText>
                    <RadioGroup
                        row
                        value={f.condition}
                        onChange={(_, v) => {
                            const val = v as FoodCondition
                            onChange(f.id, val)
                        }}
                    >
                        <FormControlLabel value={"raw"} control={<Radio />} label={"Roh"} />
                        <FormControlLabel value={"cooked"} control={<Radio />} label={"Gekocht"} />
                    </RadioGroup>
                </ListItem>))}
        </List>
    )
}