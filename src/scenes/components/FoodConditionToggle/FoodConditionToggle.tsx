import { Trans } from "@lingui/react/macro";
import { useState } from "react";
import { Button } from "@/scenes/components/Loading/Button";
import type { FoodCondition } from "../../../store";

export const FoodConditionToggle = ({
	condition,
	onClick,
}: {
	condition: FoodCondition;
	onClick: () => void;
}) => {
	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(true);
		onClick();

		setTimeout(() => setClicked(false), 250); // duration of flash
	};

	return (
		<Button
			data-testid="food-condition-chip"
			sx={{
				ml: "4px",
				borderColor: (theme) =>
					condition === "raw"
						? theme.palette.primary.main
						: theme.palette.secondary.main,
				color: (theme) => theme.palette.grey[500],
				backgroundColor: (theme) =>
					clicked ? theme.palette.grey[500] : "transparent",
				transition: "background-color 250ms ease",
			}}
			variant="outlined"
			onClick={handleClick}
		>
			{condition === "raw" ? <Trans>Roh</Trans> : <Trans>Gar</Trans>}
		</Button>
	);
};
