import Container from "@mui/material/Container"
import { useEffect } from "react"

import { services } from "../../store"
import useHista from "../../store/store"
import AddSymptomCategory from "./components/AddSymptomCategory"
import SymptomCategoryAccordion from "./components/SymptomCategoryAccordion"

export default function SymptomManagement() {
  const symptoms = useHista(state => state.symptoms)

  useEffect(() => {
    services.symptoms.list()
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
