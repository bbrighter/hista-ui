import useHista from "../store";

export const useHeadaches = () => {
	const headaches = useHista((state) => state.headaches);
	return Object.values(headaches).sort(
		(a, b) => b.date.getTime() - a.date.getTime(),
	);
};
