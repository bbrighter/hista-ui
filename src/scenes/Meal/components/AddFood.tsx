import { Autocomplete, AutocompleteChangeReason, TextField } from "@mui/material";
import useHista from "../../../store/store";
import { useEffect } from "react";

export default function AddFood() {
    const getIngredients = useHista(state => state.getIngredients)
    const postFood = useHista(state => state.postFood)
    const ingredients = useHista(state => state.ingredients)
    const options = ingredients.map(ing => ing.name)


    useEffect(() => {
        getIngredients()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const onChange = async (_: React.SyntheticEvent, v: (string | null), changeReason: AutocompleteChangeReason) => {
        if (typeof (v) == 'string' && (changeReason == 'createOption' || changeReason == 'selectOption')) {
            await postFood(v)
        }
    }


    return (
        <Autocomplete
            sx={{ mt: '1rem' }}
            options={options}
            freeSolo
            onChange={onChange}
            renderInput={params => (
                <TextField
                    {...params} label={"Zutaten"}
                />
            )}


        />
    )
}