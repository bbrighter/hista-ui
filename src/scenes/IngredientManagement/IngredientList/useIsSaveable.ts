import useHista from "@/store/store";

export const useIsSaveable = () => {
	const ingredients = useHista((state) => state.ingredients);
	return (v: string) =>
		v.trim() !== "" &&
		ingredients.every(
			(i) => i.name.trim().toLowerCase() !== v.trim().toLowerCase(),
		);
};
