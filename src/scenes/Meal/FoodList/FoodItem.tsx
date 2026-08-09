import type { NumberFieldRootChangeEventDetails } from "@base-ui/react/number-field";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { SwipeableListItem } from "react-swipeable-list";
import useDebounce from "@/hooks/useDebounce";
import { useDidUpdateEffect } from "@/hooks/useDidUpdateEffect";
import { FoodConditionToggle } from "@/scenes/components/FoodConditionToggle/FoodConditionToggle";
import NumberField from "@/scenes/components/NumberField";
import { swipeDeleteFood } from "./SwipeFoodActions";
import type { FoodListProps } from "./useFoodList";

type FoodItemProps = FoodListProps["foods"][0] & Omit<FoodListProps, "foods">;

export function FoodItem({
	ingredientName,
	condition,
	foodId,
	amount,
	patchAmount,
	patchCondition,
	deleteFood,
}: FoodItemProps) {
	const [currAmount, setCurrAmount] = useState<number | null>(amount ?? null);
	const [isPatchAmountLoading, setIsPatchAmountLoading] = useState<
		number | undefined
	>();
	const debouncedInputValue = useDebounce(currAmount, 1000);

	useDidUpdateEffect(() => {
		setIsPatchAmountLoading(foodId);
		patchAmount(foodId, currAmount ?? 0).finally(() => {
			setIsPatchAmountLoading(undefined);
		});
	}, [debouncedInputValue]);

	const onAmountChange = (
		value: number | null,
		eventDetails: NumberFieldRootChangeEventDetails,
	) => {
		if (eventDetails.reason === "input-clear") {
			setCurrAmount(null);
		} else {
			setCurrAmount(value);
		}
	};

	const onConditionClick = () => {
		const newCondition = condition === "raw" ? "cooked" : "raw";
		patchCondition(foodId, newCondition);
	};

	return (
		<SwipeableListItem
			threshold={0.5}
			trailingActions={swipeDeleteFood(foodId, deleteFood)}
		>
			<ListItem sx={{ pl: "8px", pr: "8px" }}>
				<ListItemText>
					<Typography noWrap>{ingredientName}</Typography>
				</ListItemText>
				<NumberField
					sx={{ width: "50px" }}
					size="small"
					unit="g"
					min={0}
					value={currAmount}
					onValueChange={onAmountChange}
					loading={isPatchAmountLoading === foodId}
				/>
				<FoodConditionToggle condition={condition} onClick={onConditionClick} />
			</ListItem>
		</SwipeableListItem>
	);
}
