import { type DependencyList, useEffect } from "react";

import useHista from "../store/store";

export const usePiidEffect = (fn: () => void, inputs: DependencyList) => {
	const piid = useHista((state) => state.piid);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Otherwise, fn changes on every render
	useEffect(() => {
		if (piid) {
			fn();
		}
	}, [piid, ...inputs]);
};
