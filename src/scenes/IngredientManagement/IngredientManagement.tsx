import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";

import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import { selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";

import {
	IngredientList,
	useIngredientList,
} from "./IngredientList/IngredientList";
import { ToggleVisibility } from "./IngredientList/ToggleVisibility";

export const IngredientManagement = () => {
	const isLoading = useHista(selectIsLoadingAny(["ingredients"]));
	const [showArchived, setShowArchived] = useState(true);
	const ingredientListProps = useIngredientList(showArchived);

	usePiidEffect(() => {
		actions.ingredients.list();
	}, []);

	return (
		<Loading show={isLoading}>
			<Container>
				<Box sx={{ display: "flex", justifyContent: "end" }}>
					<ToggleVisibility
						checked={!showArchived}
						onChange={() => setShowArchived(!showArchived)}
					/>
				</Box>
				<IngredientList {...ingredientListProps} />
			</Container>
		</Loading>
	);
};
