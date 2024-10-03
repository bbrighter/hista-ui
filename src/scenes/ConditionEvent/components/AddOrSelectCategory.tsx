import Modal from '@mui/material/Modal';
import useHista from '../../../store/store';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';

interface InputOption {
    id: number
    name: string
}

type NewOption = string

type Option = InputOption | NewOption

const isNewOption = (v: unknown): v is NewOption => {
    return typeof (v) == 'string'
}

export default function AddOrSelectCategory(props: {
    open: boolean
    symptomName: string
    onClose: () => void
}) {
    const postSymptomCategory = useHista(state => state.postSymptomCategory)
    const postConditionByName = useHista(state => state.postCondition)
    const symptoms = useHista(state => state.symptoms)
    const [isError, setIsError] = useState(false)

    const categories: Array<Option> = symptoms.map(s => ({
        id: s.categoryId,
        name: s.categoryName,
    }))


    const onChange = async (_e: React.SyntheticEvent, value: Option | null) => {
        if (value == null) return
        const catId = isNewOption(value) ? await postSymptomCategory(value) : value.id
        if (catId == 0) {
            setIsError(true)
            return
        }
        await postConditionByName(catId, undefined, props.symptomName)
        setIsError(false)
        props.onClose()
    }


    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
        >
            <Box sx={{
                bgcolor: 'background.paper',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '350px',
                width: '50%',
                padding: '2rem',
                borderRadius: '5px',
            }}>
                <Typography sx={{ paddingBottom: '1rem' }}>Wähle eine Kategorie für <b>{props.symptomName}</b></Typography>
                <Autocomplete
                    freeSolo
                    options={categories}
                    onChange={onChange}
                    getOptionLabel={o => isNewOption(o) ? o : o.name}
                    renderInput={params => <TextField {...params} label={'Kategorie'} />}
                    renderOption={(props, option) => {
                        const value = isNewOption(option) ? option : option.name
                        const key = isNewOption(option) ? 0 : option.id
                        return (
                            <ListItem {...props} key={key}>
                                <ListItemText primary={value} />
                            </ListItem>)
                    }}
                />
                {isError && <Alert
                    sx={{ marginTop: '5px' }}
                    severity="error"
                    variant="filled"
                >{'Da ist was schief gegangen! Probier\'s nochmal.'}
                </Alert>}
            </Box>
        </Modal>
    )
}