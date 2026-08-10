import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { Icons } from "@/scenes/components/Icons";
import type { useFoodInput } from "./useFoodInput";

type NewOption = string;
type InputOption = ReturnType<typeof useFoodInput>["options"][0];

type Option = InputOption | NewOption;

const isNewOption = (v: unknown): v is NewOption => {
	return typeof v === "string";
};

const isFoodOption = (v: InputOption) => {
	return v.type === "food";
};

type FoodInputProps = ReturnType<typeof useFoodInput>;

export function FoodInput({
	mealId,
	options,
	listIngredients,
	listTemplates,
	postFoodById,
	postFoodByName,
	postFoodsByTemplate,
}: FoodInputProps) {
	const [inputValue, setInputValue] = useState<string | undefined>("");
	const [value, setValue] = useState<Option | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		listIngredients();
		listTemplates();
	}, [listIngredients, listTemplates]);

	const onChange = async (_e: React.SyntheticEvent, value: Option | null) => {
		if (value == null) return;
		setValue(value);
		setIsLoading(true);
		if (isNewOption(value)) {
			await postFoodByName(mealId, value);
		} else if (isFoodOption(value)) {
			await postFoodById(mealId, value.id);
		} else {
			await postFoodsByTemplate(mealId, value.id);
		}
		setIsLoading(false);
		setInputValue("");
	};

	const onInputChange = (_e: React.SyntheticEvent, v: string) => {
		setInputValue(v);
	};

	return (
		<Autocomplete
			sx={{ mt: "1rem" }}
			options={options}
			freeSolo
			inputValue={inputValue}
			value={value}
			onInputChange={onInputChange}
			onChange={onChange}
			renderOption={(props, option) => {
				const key = isNewOption(option) ? 0 : option.id + option.type;
				const label = isNewOption(option) ? option : option.name;
				const { key: _ignored, ...rest } = props;
				return (
					<ListItem key={key} {...rest}>
						<ListItemText primary={label} />
						{!isNewOption(option) && option.type === "template" && (
							<ListItemIcon>
								<Icons.template />
							</ListItemIcon>
						)}
					</ListItem>
				);
			}}
			getOptionLabel={(opt) => (isNewOption(opt) ? opt : opt.name)}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Zutaten"
					slotProps={{
						...params.slotProps,
						input: {
							...params.slotProps.input,
							endAdornment: (
								<React.Fragment>
									{isLoading ? <CircularProgress size={30} /> : null}
								</React.Fragment>
							),
						},
					}}
				/>
			)}
		/>
	);
}
