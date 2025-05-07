import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import React from 'react';

import useHista from '../../../store/store';

interface InputOption {
    id: number
    name: string
}

type NewOption = string

type Option = InputOption | NewOption

const isNewOption = (v: unknown): v is NewOption => {
    return typeof (v) == 'string'
}

export default function AddFood() {
    const getIngredients = useHista(state => state.getIngredients)
    const postFood = useHista(state => state.postFood)
    const ingredients = useHista(state => state.ingredients)
    const options: Array<Option> = ingredients.map(ing => ({ name: ing.name, id: ing.id }))

    const [inputValue, setInputValue] = useState<string | undefined>('')
    const [value, setValue] = useState<Option | null>(null)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        getIngredients()
    }, [getIngredients])

    useEffect(() => {
        let name: string | undefined = undefined
        let id: number | undefined = undefined
        if (isNewOption(value)) {
            name = value
        } else {
            id = value?.id
        }
        if (value != null) {
            setIsLoading(true)
            postFood(name, id).then(() => {
                setValue(null)
                setInputValue('')
            }).finally(() => {
                setIsLoading(false)
            },
            )
        }


    }, [postFood, value])


    const onChange = async (_e: React.SyntheticEvent, value: (Option | null)) => {
        if (value == null) return
        setValue(value)

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
            renderOption={(props, option) => {
                const key = isNewOption(option) ? 0 : option.id
                const label = isNewOption(option) ? option : option.name
                return (
                    <ListItem {...props} key={key}>
                        <ListItemText primary={label} />
                    </ListItem>)
            }}
            getOptionLabel={opt => isNewOption(opt) ? opt : opt.name}
            renderInput={params => (
                <TextField
                    {...params}
                    label={'Zutaten'}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isLoading ? <CircularProgress size={30} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />)}
        />
    )
}