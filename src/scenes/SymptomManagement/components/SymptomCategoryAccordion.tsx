import { SymptomCategory } from '../../../store/symptom/symptom';
import Accordion from '@mui/material/Accordion';
import AccordionCategory from './AccordionCategory';
import AccordionSymptoms from './AccordionSymptoms';


export default function SymptomCategoryAccordion(props: {
    symptom: SymptomCategory
}) {

    return (
        <Accordion key={props.symptom.categoryId} slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionCategory category={props.symptom} />
            <AccordionSymptoms category={props.symptom} />
        </Accordion>
    )
}