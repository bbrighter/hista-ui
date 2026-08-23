import useHista from "../../../store/store";

export const useIsNameUnique = () => {
	const medicines = useHista((state) => state.medicines);

	return (name: string) => {
		const trimmed = name.trim();
		if (!trimmed) return false;

		return medicines.every((m) => m.name.trim() !== trimmed);
	};
};
