import { Autocomplete, AutocompleteChangeReason, TextField } from "@mui/material";
import useHista from "../../../store/store";
import { useEffect, useState } from "react";

export default function AddFood() {
    const getIngredients = useHista(state => state.getIngredients)
    const postFood = useHista(state => state.postFood)
    const ingredients = useHista(state => state.ingredients)
    const options = ingredients.map(ing => ing.name)

    const [inputValue, setInputValue] = useState("")
    const [value, setValue] = useState<string | null>(null)


    useEffect(() => {
        getIngredients()
    }, [getIngredients])

    useEffect(() => {
        if (value != null) {
            postFood(value).then(() => {
                setValue(null)
                setInputValue("")
            }
            )
        }
    }, [postFood, value])


    const onChange = async (_e: React.SyntheticEvent, _v: (string | null), changeReason: AutocompleteChangeReason) => {
        if (typeof (inputValue) == 'string' && (changeReason == 'createOption' || changeReason == 'selectOption')) {
            setValue(inputValue)
        }
    }

    const onInputChange = (_e: React.SyntheticEvent, v: string) => { setInputValue(v) }

    return (
        <Autocomplete
            sx={{ mt: '1rem' }}
            options={options}
            freeSolo
            inputValue={inputValue}
            value={value}
            onInputChange={onInputChange}
            onChange={onChange}
            renderInput={params => (
                <TextField
                    {...params} label={"Zutaten"}
                />
            )}
        />
    )
}