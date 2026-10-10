import useHista from "@/store/store";

export const useSpinner = () => {
	const loadingMode = useHista((state) => state.loadingMode);
	console.log("loadingMode", loadingMode);

	return loadingMode === "spinner";
};
