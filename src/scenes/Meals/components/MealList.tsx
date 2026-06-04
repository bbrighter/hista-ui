import { actions } from "../../../actions";
import { useAppNavigate } from "../../../hooks/useNavigate";
import useHista from "../../../store/store";
import { OverviewList } from "../../components";

export default function MealList() {
	const meals = useHista((state) => state.meals);
	const navigate = useAppNavigate();

	const onClick = (id: number) => {
		navigate.to.mealDetail(id);
	};

	const onDelete = async (id: number) => {
		await actions.meals.delete(id);
	};

	const onSetNow = async (id: number) => {
		await actions.meals.patchDate(id, new Date().toISOString());
	};

	return (
		<OverviewList
			items={meals}
			onClick={onClick}
			onDelete={onDelete}
			getData={actions.meals.list}
			onSetNow={onSetNow}
		/>
	);
}
