import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { actions } from "@/actions";
import { selectNonArchivedMedicines } from "../../../store/medicines";
import useHista from "../../../store/store";

export const useTodaysIntakes = () => {
	const intakes = useHista((state) => state.intakes);
	const medicines = useHista(
		useShallow((state) => selectNonArchivedMedicines(state)),
	);
	const today = new Date().toDateString();

	return useMemo(
		() =>
			medicines.map((m) => {
				const intake = intakes.find(
					(i) => m.id === i.medicineId && i.date.toDateString() === today,
				);
				return {
					medicineId: m.id,
					name: m.name,
					count: intake?.count ?? 0,
				};
			}),
		[intakes, medicines, today],
	);
};

export const useOldIntakes = () => {
	const intakes = useHista((state) => state.intakes);
	const medicines = useHista((state) => state.medicines);

	return useMemo(() => {
		const uniqueDates = [
			...new Set(intakes.map((i) => i.date.toDateString())),
		].filter((d) => d !== new Date().toDateString());

		return uniqueDates
			.map((d) => ({
				date: new Date(d),
				values: medicines.flatMap((m) => {
					const intake = intakes.find(
						(i) => m.id === i.medicineId && i.date.toDateString() === d,
					);

					const isVisible =
						!m.isArchived || (intake?.count !== undefined && intake.count > 0);

					return isVisible
						? [
								{
									medicineId: m.id,
									name: m.name,
									count: intake?.count ?? 0,
									archived: m.isArchived,
								},
							]
						: [];
				}),
			}))
			.sort((a, b) => b.date.getTime() - a.date.getTime());
	}, [intakes, medicines]);
};

export const useIntakeList = () => {
	const todaysIntakes = useTodaysIntakes();
	const oldIntakes = useOldIntakes();
	const onDecrease = actions.intakes.decrement;
	const onIncrease = actions.intakes.increment;
	return { todaysIntakes, oldIntakes, onDecrease, onIncrease };
};
