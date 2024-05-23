import { Autocomplete, Checkbox, ListItem, ListItemText, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import useHista from "../../../store/store";

interface Option {
    id: number
    name: string
    categoryId: number
    categoryName: string
}

type Options = Array<Option>

export default function SymptomSelect(props: {
    onChange: (ids: Array<number>) => void
}) {
    const getSymptoms = useHista(state => state.getSymptoms)
    const symptoms = useHista(state => state.symptoms)
    const [values, setValues] = useState<Options>([])

    useEffect(() => {
        if (symptoms.length == 0) {
            getSymptoms()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (values.length > 0) {
            props.onChange(values.map(v => v.id))
        }
        // props should not be part of the dependencies, because it leads to a rerender loop
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [values])

    const options: Options = symptoms.flatMap(c => c.symptoms.map(s => ({
        id: s.id,
        name: s.name,
        categoryId: s.categoryId,
        categoryName: c.categoryName
    })))

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
            groupBy={(option) => option.categoryName}
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