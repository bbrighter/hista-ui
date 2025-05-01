import { useEffect } from 'react'
import useHista from '../../store/store'
import SymptomCategoryAccordion from './components/SymptomCategoryAccordion';
import AddSymptomCategory from './components/AddSymptomCategory';
import Container from '@mui/material/Container';


export default function SymptomManagement() {
    const getSymptoms = useHista(state => state.getSymptoms)
    const symptoms = useHista(state => state.symptoms)


    useEffect(() => {
        getSymptoms()
    }, [])

    return (
        <Container>
            <ul>
                {symptoms.map((symptom) => (
                    <SymptomCategoryAccordion key={symptom.categoryId} symptom={symptom} />
                ))}
            </ul>
            <AddSymptomCategory />
        </Container>
    )
}