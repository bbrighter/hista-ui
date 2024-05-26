import { Autocomplete, Checkbox, ListItem, ListItemText, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import useHista from "../../../store/store";

interface Option {
    id: number
    name: string
}

type Options = Array<Option>

export default function IngredientSelect(props: {
    onChange: (ids: Array<number>) => void
}) {
    const getIngredients = useHista(state => state.getIngredients)
    const ingredients = useHista(state => state.ingredients)
    const [values, setValues] = useState<Options>([])

    useEffect(() => {
        if (ingredients.length == 0) {
            getIngredients()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        props.onChange(values.map(v => v.id))
        // props should not be part of the dependencies, because it leads to a rerender loop
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [values])

    const options: Options = ingredients.map(ing => ({
        id: ing.id,
        name: ing.name
    }))

    const handleChange = (_: SyntheticEvent, value: Options) => {
        setValues(value)
    }

    return (
        <Autocomplete
            sx={{ mt: 2 }}
            multiple
            limitTags={4}
            disableCloseOnSelect
            options={options}
            getOptionLabel={option => option.name}
            isOptionEqualToValue={(option, value) => option.id == value.id}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Symptome"
                />
            )}
            value={values}
            onChange={handleChange}
            renderOption={(props, options, { selected }) => (
                <ListItem {...props}>
                    <Checkbox checked={selected} />
                    <ListItemText primary={options.name} />
                </ListItem>
            )}
        />
    )
}