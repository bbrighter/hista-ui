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
import {
	AddFood,
	FoodList,
	MealNutritionResult,
	MealSettings,
	ShowNutritionChart,
	useMealSettings,
} from "./components";

export default function Meal() {
	const isLoading = useHista(
		selectIsLoadingAny(["ingredients", "templates", "meal"]),
	);
	const params = useParams<{ mealId: string }>();

	usePiidEffect(() => {
		actions.meals.get(Number(params.mealId));
	}, [params.mealId]);

	const mealSettings = useMealSettings();

	return (
		<Loading show={isLoading}>
			<Container sx={{ padding: "2rem" }}>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<MealNutritionResult />
					<ShowNutritionChart />
				</Box>
				<FormGroup>
					<MealSettings {...mealSettings} />
					<FormControl>
						<AddFood />
					</FormControl>
				</FormGroup>
				<FoodList />
			</Container>
		</Loading>
	);
}
