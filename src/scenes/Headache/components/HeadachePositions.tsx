import { actions } from "../../../actions";
import { validHeadachePositions } from "../../../store";
import useHista from "../../../store/store";
import HeadacheInputs, { type ValueLabelPair } from "./Tags";

export default function HeadachePositionsButtons() {
	const positions = useHista((state) => state.headache.positions);
	const id = useHista((state) => state.headache.id);

	const onAdd = (v: ValueLabelPair) =>
		actions.headaches.patchPositions(id, [...positions, v]);

	const onRemove = (v: ValueLabelPair) =>
		actions.headaches.patchPositions(
			id,
			positions.filter((pos) => pos.value !== v.value),
		);

	return (
		<HeadacheInputs
			label="Wo?"
			options={validHeadachePositions}
			values={positions}
			onAdd={onAdd}
			onRemove={onRemove}
		/>
	);
}
