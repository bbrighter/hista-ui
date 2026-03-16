import { useAppNavigate } from "../../../hooks/useNavigate"
import { mealService } from "../../../store"
import useHista from "../../../store/store"
import OverviewList from "../../components/OverviewList"

export default function MealList() {
  const meals = useHista(state => state.meals)
  const navigate = useAppNavigate()

  const onClick = (id: number) => {
    navigate.to.mealDetail(id)
  }

  const onDelete = async (id: number) => {
    await mealService.deleteMeal(id)
  }

  const onSetNow = async (id: number) => {
    await mealService.patchMealDate(id, new Date().toISOString())
  }

  return (
    <OverviewList
      items={meals}
      onClick={onClick}
      onDelete={onDelete}
      getData={mealService.listMeals}
      onSetNow={onSetNow}
    />
  )
}
