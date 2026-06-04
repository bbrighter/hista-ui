import Button from "@mui/material/Button";
import { useState } from "react";

import { actions } from "../../../actions";
import { useAppNavigate } from "../../../hooks/useNavigate";
import { Icons } from "../../components/Icons";

export const AddMealButton = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useAppNavigate();

	const onCreate = async () => {
		setLoading(true);
		const id = await actions.meals.post();
		setLoading(false);
		if (id) {
			navigate.to.mealDetail(id);
		}
	};

	return (
		<Button
			data-testid="add-meal-button"
			startIcon={<Icons.meal />}
			variant="contained"
			onClick={onCreate}
			loading={loading}
		>
			Neu
		</Button>
	);
};
