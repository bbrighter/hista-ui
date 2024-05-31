import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDidUpdateEffect(fn: () => void, inputs: Array<any>) {
    const isMountingRef = useRef(false);

    useEffect(() => {
        isMountingRef.current = true;
    }, []);

    useEffect(() => {
        if (!isMountingRef.current) {
            console.log('return fn')
            return fn();
        } else {
            console.log('set false')
            isMountingRef.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, inputs);
}