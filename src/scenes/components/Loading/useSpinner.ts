import useHista from "@/store/store";

export const useSpinner = () => {
	const loadingMode = useHista((state) => state.loadingMode);

	return loadingMode === "spinner";
};
