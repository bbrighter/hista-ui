import { SwipeAction, TrailingActions } from "react-swipeable-list";
import { Icons } from "@/scenes/components/Icons";
import { Button } from "@/scenes/components/Loading/Button";

export const swipeDeleteFood = (
	id: number,
	onDelete: (id: number) => Promise<void>,
) => {
	return (
		<TrailingActions>
			<SwipeAction onClick={() => onDelete(id)} destructive>
				<Button
					data-testid="delete-food-button"
					variant="contained"
					color="error"
					startIcon={<Icons.actions.delete />}
				/>
			</SwipeAction>
		</TrailingActions>
	);
};
