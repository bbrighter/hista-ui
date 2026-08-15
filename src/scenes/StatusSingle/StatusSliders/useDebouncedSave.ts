import debounce from "lodash.debounce";
import { useCallback, useMemo, useRef } from "react";

export const useDebouncedSave = <T>(
	save: (value: T) => Promise<void>,
	delay: number,
) => {
	const saveRef = useRef(save);
	saveRef.current = save;

	const pendingRef = useRef<T | null>(null);
	const savingRef = useRef(false);

	const saveLatest = useCallback(async (value: T) => {
		pendingRef.current = value;

		if (savingRef.current) return;

		savingRef.current = true;

		try {
			while (pendingRef.current) {
				const next = pendingRef.current;
				pendingRef.current = null;
				await saveRef.current(next);
			}
		} finally {
			savingRef.current = false;
		}
	}, []);
	const debouncedSave = useMemo(
		() =>
			debounce((value: T) => {
				void saveLatest(value);
			}, delay),
		[delay, saveLatest],
	);

	return (values: T) => debouncedSave(values);
};
