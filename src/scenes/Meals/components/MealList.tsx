import { useNavigate } from "react-router-dom"
import useHista from "../../../store/store";
import OverviewList from "../../components/OverviewList";
import { url } from "../../../constants";

export default function MealList() {
    const getMeals = useHista(state => state.getMeals)
    const meals = useHista(state => state.meals)
    const deleteMeal = useHista(state => state.deleteMeal)
    const navigate = useNavigate()


    const onClick = (id: number) => {
        navigate(url.MEAL + "/" + id)
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