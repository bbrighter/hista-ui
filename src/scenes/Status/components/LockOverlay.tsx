import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";

import useHista from "../../../store/store";

export const LockOverlay = ({
	id,
	locked,
	children,
}: {
	id: number;
	locked?: boolean;
	children: React.ReactNode;
}) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const [progress, setProgress] = useState(0);
	const isPressingRef = useRef(false);
	const updateStatus = useHista((state) => state.updateStatus);
	const duration = 500;

	// biome-ignore lint/correctness/useExhaustiveDependencies: Should only be triggered on first render
	useEffect(() => {
		return () => resetTimer();
	}, []);

	const startTimer = () => {
		const start = Date.now();
		intervalRef.current = setInterval(() => {
			if (!isPressingRef.current) {
				if (intervalRef.current == null) return;

				clearInterval(intervalRef.current);
				intervalRef.current = null;
				return;
			}
			const elapsed = Date.now() - start;
			const prog = Math.min(elapsed / duration, 1);
			setProgress(prog);

			if (prog >= 1 && intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}, 16);

		timerRef.current = setTimeout(() => {
			if (isPressingRef.current) {
				updateStatus(id, { locked: false });
			}
		}, duration);
	};

	const resetTimer = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		setProgress(0);
	};

	const onRelease = (e: React.PointerEvent) => {
		isPressingRef.current = false;
		if (e.currentTarget.hasPointerCapture(e.pointerId)) {
			e.currentTarget.releasePointerCapture(e.pointerId);
		}
		resetTimer();
	};

	const onPress = (e: React.PointerEvent) => {
		if (isPressingRef.current) return;
		isPressingRef.current = true;
		e.currentTarget.setPointerCapture(e.pointerId);
		startTimer();
	};

	if (!locked) return children;

	return (
		<Box data-testid="lock-overlay" sx={{ position: "relative" }}>
			<Box
				onPointerDown={onPress}
				onPointerUp={onRelease}
				onPointerCancel={onRelease}
				sx={{
					position: "absolute",
					inset: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "rgba(0,0,0,0.55)",
					zIndex: 10,
					height: `calc(100% - ${progress * 100}%)`,
				}}
			>
				<Stack sx={{ alignItems: "center" }}>
					<Typography variant="button">Gesperrt</Typography>
					<Typography variant="body2">
						Zum Entsperren gedrückt halten
					</Typography>
				</Stack>
			</Box>
			{children}
		</Box>
	);
};
