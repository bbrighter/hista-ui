import "react-swipeable-list/dist/styles.css";

import { SwipeableList } from "react-swipeable-list";

import { FoodItem } from "./FoodItem";
import type { FoodListProps } from "./useFoodList";

export function FoodList({
	foods,
	patchAmount,
	patchCondition,
	deleteFood,
}: FoodListProps) {
	return (
		<SwipeableList>
			{foods.map((f) => (
				<FoodItem
					key={f.foodId}
					patchAmount={patchAmount}
					patchCondition={patchCondition}
					deleteFood={deleteFood}
					foodId={f.foodId}
					condition={f.condition}
					ingredientId={f.ingredientId}
					ingredientName={f.ingredientName}
					amount={f.amount}
				/>
			))}
		</SwipeableList>
	);
}
