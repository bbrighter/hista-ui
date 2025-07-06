import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import { FilterOptionsState } from '@mui/material/useAutocomplete';
import { useEffect, useState } from 'react';

import useHista from '../../../store/store';
import AddOrSelectCategory from './AddOrSelectCategory';

interface SymptomOption {
    categoryId: number
    categoryName: string
    symptomId: number
    symptomName: string
}

type NewOption = string

type Option = SymptomOption | NewOption

const isNewOption = (opt: unknown): opt is NewOption => {
    return typeof (opt) == 'string'
}

export default function AddCondition() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<Option | null>(null)
    const [inputValue, setInputValue] = useState('')
    const getSymptoms = useHista(state => state.getSymptoms)
    const postConditionById = useHista(state => state.postCondition)
    const symptoms = useHista(state => state.symptoms)

    useEffect(() => {
        getSymptoms()
    }, [getSymptoms])

    const options = symptoms.flatMap(cat => (
        cat.symptoms.map(sym => (
            { categoryId: cat.categoryId, categoryName: cat.categoryName, symptomId: sym.id, symptomName: sym.name }
        ))
    ))

    const onChange = async (_e: React.SyntheticEvent, v: Option | null, reason: AutocompleteChangeReason) => {
        if (v == null) return
        if (isNewOption(v) && (reason == 'selectOption' || reason == 'createOption')) {
            setOpen(true)
            setValue(v)
        } else if (!isNewOption(v) && reason == 'selectOption') {
            await postConditionById(v.categoryId, v.symptomId, undefined)
            setInputValue('')
        }
    }

    const filterOptions = (options: Array<Option>, params: FilterOptionsState<Option>) => {
        const { inputValue } = params
        const filtered = options.filter(o => {
            if (!isNewOption(o)) {
                return o.categoryName.toLowerCase().includes(inputValue.toLowerCase()) || o.symptomName.toLowerCase().includes(inputValue.toLowerCase())
            }
        })
        if (inputValue != '') {
            filtered.push(inputValue)
        }
        return filtered
    }

    const onCloseModal = () => {
        setOpen(false)
        setInputValue('')
        setValue(null)
    }

    return (
        <>
            <Autocomplete sx={{ paddingTop: '20px' }}
                freeSolo
                inputValue={inputValue}
                onInputChange={(_e, v) => setInputValue(v)}
                value={value}
                onChange={onChange}
                options={options}
                getOptionLabel={s => typeof (s) == 'string' ? s : s.symptomName}
                selectOnFocus
                clearOnBlur
                filterOptions={filterOptions}
                renderOption={(props, option) => {
                    const key = isNewOption(option) ? 0 : option.symptomId
                    const primary = isNewOption(option) ? option : option.symptomName
                    const secondary = isNewOption(option) ? 'hinzufügen' : option.categoryName
                    return (<ListItem {...props} key={key}>
                        <ListItemText
                            primary={primary}
                            secondary={secondary}
                        />
                    </ListItem>
                    )
                }}
                renderInput={params => (<TextField {...params} label={'Symptom'} />)}
            />
            <AddOrSelectCategory
                open={open}
                symptomName={isNewOption(value) ? value : value?.symptomName || ''}
                onClose={onCloseModal}
            />
        </>
    )
}