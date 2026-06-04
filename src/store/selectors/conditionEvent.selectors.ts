import useHista from "../store";

export const useConditionEvents = () => {
	const events = useHista((state) => state.metaConditionEvents);
	return [...events].sort((a, b) => b.date.getTime() - a.date.getTime());
};
