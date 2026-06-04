import { type DependencyList, useEffect, useRef } from "react";

export function useDidUpdateEffect(fn: () => void, inputs: DependencyList) {
	const isMountingRef = useRef(false);

	useEffect(() => {
		isMountingRef.current = true;
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: fn is not memoized
	useEffect(() => {
		if (!isMountingRef.current) {
			return fn();
		} else {
			isMountingRef.current = false;
		}
	}, [...inputs]);
}
