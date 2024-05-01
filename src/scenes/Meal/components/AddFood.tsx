import { Autocomplete, AutocompleteChangeReason, AutocompleteInputChangeReason, TextField } from "@mui/material";
import useHista from "../../../store/store";
import { useEffect, useState } from "react";

export default function AddFood() {
    const getIngredients = useHista(state => state.getIngredients)
    const postFood = useHista(state => state.postFood)
    const ingredients = useHista(state => state.ingredients)
    const options = ingredients.map(ing => ing.name)

    const [value, setValue] = useState("")


    useEffect(() => {
        getIngredients()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const onChange = async (_: React.SyntheticEvent, v: (string | null), changeReason: AutocompleteChangeReason) => {
        if (typeof (v) == 'string' && (changeReason == 'createOption' || changeReason == 'selectOption')) {
            await postFood(v)
            setValue("")
        }
    }

    const onInputChange = (_: React.SyntheticEvent, v: string, reason: AutocompleteInputChangeReason) => {
        console.log(v, reason)
        setValue(v)
    }


    return (
        <Autocomplete
            sx={{ mt: '1rem' }}
            options={options}
            freeSolo
            inputValue={value}
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