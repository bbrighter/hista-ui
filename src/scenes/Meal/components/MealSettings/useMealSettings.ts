import { actions } from "../../../../actions";
import type { Freshness } from "../../../../store";
import useHista from "../../../../store/store";

export const useMealSettings = () => {
	const { date, id, stressLevel, freshness, isAlone } = useHista(
		(state) => state.meal,
	);

	const setDate = (dateString: string) =>
		actions.meals.patchDate(id, dateString);
	const setStressLevel = (stressLevel: number) =>
		actions.meals.patchStressLevel(id, stressLevel);
	const setFreshness = (freshness: Freshness) =>
		actions.meals.patchFreshness(id, freshness);
	const setAloneness = (isAlone: boolean) =>
		actions.meals.patchIsAlone(id, isAlone);

	return {
		date,
		id,
		stressLevel,
		freshness,
		isAlone,
		setDate,
		setStressLevel,
		setFreshness,
		setAloneness,
	};
};
