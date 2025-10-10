import { useAppNavigate } from '../../../hooks/useNavigate';
import useHista from '../../../store/store';
import OverviewList from '../../components/OverviewList';

export default function MealList() {
    const getMeals = useHista(state => state.listMeals)
    const meals = useHista(state => state.meals)
    const deleteMeal = useHista(state => state.deleteMeal)
    const navigate = useAppNavigate()


    const onClick = (id: number) => {
        navigate.to.mealDetail(id)
    }

    const onDelete = async (id: number) => {
        await deleteMeal(id)
    }

    return (
        <OverviewList
            items={meals}
            onClick={onClick}
            onDelete={onDelete}
            getData={getMeals}
        />
    )
}