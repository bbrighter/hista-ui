import { useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { Symptom, SymptomCategory } from '../../../store/symptom/symptom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextFieldSaveAndAbort from './TextFieldSaveAndAbort';
import useHista from '../../../store/store';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// ------------------------------------------------- //
// TODO: Add deletion of symptom and category
// TODO: Add reordering of symptoms 
// ------------------------------------------------- //


export default function SymptomCategoryAccordion(props: {
    symptom: SymptomCategory
}) {
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [categoryName, setCategoryName] = useState(props.symptom.categoryName)
    const changeCategoryName = useHista(state => state.changeSymptomCategoryName)
    const isCategoryNameAvailable = useHista(state => state.isCategoryNameAvailable)



    const symptom = props.symptom

    const onSave = async () => {
        setIsLoading(true)
        changeCategoryName(symptom.categoryId, categoryName).finally(() => {
            setIsLoading(false)
            setIsEditTitle(false)
        })
    }

    const onClickRenameCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsEditTitle(!isEditTitle)
    }

    return (
        <Accordion key={symptom.categoryId}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    {isEditTitle ?
                        <TextFieldSaveAndAbort
                            label={'Kategoriename'}
                            value={categoryName}
                            onSave={onSave}
                            onCancel={() => setIsEditTitle(false)}
                            isLoading={isLoading}
                            isSaveable={isCategoryNameAvailable(categoryName)}
                            onChange={(e) => setCategoryName(e.target.value)}
                            size='small'
                        />
                        :
                        <>
                            <Typography>{symptom.categoryName} ({symptom.symptoms.length})</Typography>
                            <IconButton onClick={onClickRenameCategory}>
                                <CreateIcon />
                            </IconButton>
                        </>}
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {symptom.symptoms.map(s => (
                        <SymptomAccordionEntry key={s.id} symptom={s} />
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    )
}



function SymptomAccordionEntry(props: {
    symptom: Symptom
}) {
    const [symptomName, setSymptomName] = useState(props.symptom.name)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const isSymptomNameAvailable = useHista(state => state.isSymptomNameAvailable)
    const changeSymptomName = useHista(state => state.changeSymptomName)

    const onSave = async () => {
        setIsLoading(true)
        changeSymptomName(props.symptom.id, symptomName).finally(() => {
            setIsLoading(false)
            setIsEditTitle(false)
        })
    }

    return (
        <ListItem
            secondaryAction={
                !isEditTitle &&
                <IconButton onClick={() => setIsEditTitle(!isEditTitle)}>
                    <CreateIcon />
                </IconButton>
            }
        >
            {
                isEditTitle ?
                    <TextFieldSaveAndAbort
                        label='Symptomname'
                        value={symptomName}
                        onChange={(e) => setSymptomName(e.target.value)
                        }
                        onSave={onSave}
                        onCancel={() => setIsEditTitle(false)}
                        isLoading={isLoading}
                        isSaveable={isSymptomNameAvailable(symptomName, props.symptom.categoryId)}
                        size='small'
                    />
                    :
                    <ListItemText primary={props.symptom.name} />
            }
        </ListItem >
    )
}