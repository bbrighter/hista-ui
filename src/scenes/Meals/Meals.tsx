import Container from "@mui/material/Container";
import { selectIsLoadingAny } from "@/store";
import useHista from "@/store/store";
import { Loading } from "../components";
import { MealButtonGroup } from "./MealButtonGroup/MealButtonGroup";
import { MealList, useMealList } from "./MealList/MealList";

export default function Meals() {
	const isLoading = useHista(selectIsLoadingAny(["meals"]));

	const mealListProps = useMealList();

	return (
		<Loading show={isLoading}>
			<Container sx={{ padding: "2rem" }}>
				<MealButtonGroup />
				<MealList {...mealListProps} />
			</Container>
		</Loading>
	);
}
