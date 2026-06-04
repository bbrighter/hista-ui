import { useMemo } from "react";

import useHista from "../../../store/store";

export const useConditionsWithSymptoms = () => {
	const conditions = useHista((state) => state.conditionEvent.conditions);
	const symptoms = useHista((state) => state.symptoms);

	const symptomMap = useMemo(() => {
		return new Map(
			symptoms.flatMap((cat) =>
				cat.symptoms.map((s) => [
					s.id,
					{
						catId: cat.categoryId,
						catName: cat.categoryName,
						symptomId: s.id,
						symptomName: s.name,
					},
				]),
			),
		);
	}, [symptoms]);

	return useMemo(
		() =>
			conditions
				.map((c) => ({
					...c,
					...symptomMap.get(c.symptomId),
				}))
				.sort((a, b) => (b.catId ?? 0) - (a.catId ?? 0)),
		[conditions, symptomMap],
	);
};
