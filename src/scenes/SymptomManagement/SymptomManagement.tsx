import Container from "@mui/material/Container";
import { useEffect } from "react";

import { actions } from "../../actions";
import { selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";
import AddSymptomCategory from "./components/AddSymptomCategory";
import SymptomCategoryAccordion from "./components/SymptomCategoryAccordion";

export default function SymptomManagement() {
	const isLoading = useHista(selectIsLoadingAny(["symptoms"]));
	const symptoms = useHista((state) => state.symptoms);

	useEffect(() => {
		actions.symptoms.list();
	}, []);

	return (
		<Loading show={isLoading}>
			<Container sx={{ padding: "2rem" }}>
				<ul>
					{symptoms.map((symptom) => (
						<SymptomCategoryAccordion
							key={symptom.categoryId}
							symptom={symptom}
						/>
					))}
				</ul>
				<AddSymptomCategory />
			</Container>
		</Loading>
	);
}
