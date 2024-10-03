import DeleteIcon from '@mui/icons-material/Delete';
import useHista from '../../../store/store';
import { mealConstants } from '../../../constants';
import { FoodCondition } from '../../../store/meal/food';
import { useState } from 'react';
import LoadingIconButton from '../../components/LoadingIconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import CircularProgress from '@mui/material/CircularProgress';

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
                <ListItem key={f.id}
                    secondaryAction={
                        <LoadingIconButton
                            onClick={() => onDelete(f.id)}
                            isLoading={isDeleteLoading == f.id}
                            icon={<DeleteIcon />}
                        />
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
                        <ToggleButton value='raw' sx={{ width: '3rem' }}>
                            {isPatchLoading?.id == f.id && isPatchLoading.cond == 'raw' ? <CircularProgress size={20} /> : mealConstants.RAW}
                        </ToggleButton>
                        <ToggleButton value='cooked' sx={{ width: '3rem' }}>
                            {isPatchLoading?.id == f.id && isPatchLoading.cond == 'cooked' ? <CircularProgress size={20} /> : mealConstants.COOKED}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </ListItem>))}
        </List>
    )
}