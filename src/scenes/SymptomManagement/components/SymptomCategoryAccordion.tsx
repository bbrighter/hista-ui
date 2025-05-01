import { Symptom, SymptomCategory } from '../../../store/symptom/symptom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextFieldSaveAndAbort from './TextFieldSaveAndAbort';
import useHista from '../../../store/store';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


export default function SymptomCategoryAccordion(props: {
    symptom: SymptomCategory
}) {
    const symptoms = useHista(state => state.symptoms)
    const changeCategoryName = useHista(state => state.changeSymptomCategoryName)
    const isCategoryNameAvailable = useHista(state => state.isCategoryNameAvailable)
    const deleteCategory = useHista(state => state.deleteCategory)

    const onSave = async (v: string) => changeCategoryName(props.symptom.categoryId, v)
    const onDelete = async () => await deleteCategory(props.symptom.categoryId)
    const isDeletable = props.symptom.symptoms.length === 0




    return (
        <Accordion key={props.symptom.categoryId} slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} component='div'>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} onClick={(e) => e.stopPropagation()}>
                    <TextFieldSaveAndAbort
                        label={'Kategoriename'}
                        value={props.symptom.categoryName}
                        onSave={onSave}
                        onDelete={onDelete}
                        isSaveable={isCategoryNameAvailable}
                        size='medium'
                        isHeader
                        numberOfObjects={props.symptom.symptoms.length}
                        isDeletable={isDeletable}
                    />

                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {Array.isArray(props.symptom.symptoms) ?
                        props.symptom.symptoms.map(s => (
                            <SymptomAccordionEntry key={s.id} symptom={s} categories={symptoms} />
                        )) : null}
                </List>
            </AccordionDetails>
        </Accordion>
    )
}



function SymptomAccordionEntry(props: {
    symptom: Symptom
    categories: SymptomCategory[]
}) {
    const isSymptomNameAvailable = useHista(state => state.isSymptomNameAvailable)
    const changeSymptomName = useHista(state => state.changeSymptomName)
    const changeSymptomCategory = useHista(state => state.changeSymptomCategory)

    const onSave = async (v: string) => changeSymptomName(props.symptom.id, v)
    const onSwap = async (targetId: number) => changeSymptomCategory(props.symptom.id, props.symptom.categoryId, targetId)

    return (
        <ListItem>
            <TextFieldSaveAndAbort
                label='Symptomname'
                value={props.symptom.name}
                onSave={onSave}
                isSaveable={(v) => isSymptomNameAvailable(v, props.symptom.categoryId)}
                size='small'
                onSwap={onSwap}
                swapLabel='Neue Kategorie'
                categoryId={props.symptom.categoryId}
                categories={props.categories}
            />
        </ListItem >
    )
}