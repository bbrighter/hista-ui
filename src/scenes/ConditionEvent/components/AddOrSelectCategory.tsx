import { Autocomplete, Box, ListItem, ListItemText, Modal, TextField, Typography } from "@mui/material";
import useHista from "../../../store/store";
import React from "react";

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
    const postConditionByName = useHista(state => state.postConditionByName)
    const symptoms = useHista(state => state.symptoms)

    const categories: Array<Option> = symptoms.map(s => ({
        id: s.categoryId,
        name: s.categoryName
    }))


    const onChange = async (_e: React.SyntheticEvent, value: Option | null) => {
        if (value == null) return
        const catId = isNewOption(value) ? await postSymptomCategory(value) : value.id
        await postConditionByName(props.symptomName, catId)
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
                borderRadius: '5px'
            }}>
                <Typography sx={{ paddingBottom: '1rem' }}>Wähle eine Kategorie für <b>{props.symptomName}</b></Typography>
                <Autocomplete
                    freeSolo
                    options={categories}
                    onChange={onChange}
                    getOptionLabel={o => isNewOption(o) ? o : o.name}
                    renderInput={params => <TextField {...params} label={"Kategorie"} />}
                    renderOption={(props, option) => {
                        const value = isNewOption(option) ? option : option.name
                        const key = isNewOption(option) ? 0 : option.id
                        return (
                            <ListItem {...props} key={key}>
                                <ListItemText primary={value} />
                            </ListItem>)
                    }}
                />
            </Box>
        </Modal>
    )
}