import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import { useParams } from "react-router-dom";
import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import { selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";
import { FoodInput } from "./AddFood/FoodInput";
import { useFoodInput } from "./AddFood/useFoodInput";
import { FoodList } from "./FoodList/FoodList";
import { useFoodList } from "./FoodList/useFoodList";
import { MealNutrition } from "./MealNutrition/MealNutrition";
import { useTotalMealNutrition } from "./MealNutrition/useMealNutrition";
import { MealSettings } from "./MealSettings/MealSettings";
import { useMealSettings } from "./MealSettings/useMealSettings";
import { NutritionChartButton } from "./NutritionChart/NutritionChartButton";
import { useNutritionChart } from "./NutritionChart/useNutritionChart";

export default function Meal() {
	const isLoading = useHista(
		selectIsLoadingAny(["ingredients", "templates", "meal"]),
	);
	const params = useParams<{ mealId: string }>();

	usePiidEffect(() => {
		actions.meals.get(Number(params.mealId));
	}, [params.mealId]);

	const mealSettings = useMealSettings();
	const foodInputSettings = useFoodInput();
	const foodListSettings = useFoodList();
	const nutrition = useTotalMealNutrition();
	const nutritionChart = useNutritionChart();

	return (
		<Loading show={isLoading}>
			<Container sx={{ padding: "2rem" }}>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<MealNutrition {...nutrition} />
					<NutritionChartButton {...nutritionChart} />
				</Box>
				<FormGroup>
					<MealSettings {...mealSettings} />
					<FormControl>
						<FoodInput {...foodInputSettings} />
					</FormControl>
				</FormGroup>
				<FoodList {...foodListSettings} />
			</Container>
		</Loading>
	);
}
