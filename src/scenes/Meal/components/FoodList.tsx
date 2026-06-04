import "react-swipeable-list/dist/styles.css";

import { SwipeableList } from "react-swipeable-list";

import { useFoodForMeal } from "../../../store";
import { FoodItem } from "./FoodItem";

export function FoodList() {
	const foods = useFoodForMeal();

	return (
		<SwipeableList>
			{foods.map((f) => (
				<FoodItem food={f} key={f.id} />
			))}
		</SwipeableList>
	);
}
