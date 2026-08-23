import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

type BaseIntakeProp = {
	id: number;
	name: string;
	count: number;
	isArchived?: boolean;
};

type OldIntakeProp = BaseIntakeProp & {
	isOld: true;
};

type CurrentIntakeProp = BaseIntakeProp & {
	isOld?: false;
	onIncrease: (id: number) => Promise<void>;
	onDecrease: (id: number) => Promise<void>;
};

type IntakeListProp = OldIntakeProp | CurrentIntakeProp;

export const IntakeListItem = (props: IntakeListProp) => {
	const { id, name, isArchived, count, isOld } = props;
	const decreaseIsDisabled = count === 0;

	const secondaryAction = isOld ? null : (
		<ButtonGroup>
			<Button data-testid="increaseButton" onClick={() => props.onIncrease(id)}>
				+
			</Button>
			<Button
				disabled={decreaseIsDisabled}
				onClick={() => props.onDecrease(id)}
				data-testid="decreaseButton"
			>
				-
			</Button>
		</ButtonGroup>
	);

	return (
		<ListItem secondaryAction={secondaryAction}>
			<ListItemText
				sx={isArchived ? { color: "gray" } : {}}
				primary={name}
				secondary={count}
			/>
		</ListItem>
	);
};
