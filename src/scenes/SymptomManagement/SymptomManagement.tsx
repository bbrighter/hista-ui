import Container from "@mui/material/Container"
import { useEffect } from "react"

import useHista from "../../store/store"
import AddSymptomCategory from "./components/AddSymptomCategory"
import SymptomCategoryAccordion from "./components/SymptomCategoryAccordion"

export default function SymptomManagement() {
  const getSymptoms = useHista(state => state.getSymptoms)
  const symptoms = useHista(state => state.symptoms)

  useEffect(() => {
    getSymptoms()
  }, [])

  return (
    <Container>
      <ul>
        {symptoms.map(symptom => (
          <SymptomCategoryAccordion key={symptom.categoryId} symptom={symptom} />
        ))}
      </ul>
      <AddSymptomCategory />
    </Container>
  )
}
