import SickIcon from "@mui/icons-material/Sick"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Container from "@mui/material/Container"
import { useState } from "react"

import { useAppNavigate } from "../../hooks/useNavigate"
import { conditionEvents } from "../../store/service/conditionEvents.service"
import EventList from "./components/EventList"

export default function ConditionEvents() {
  const navigate = useAppNavigate()
  const [loading, setLoading] = useState(false)

  const onClickAddSymptom = async () => {
    setLoading(true)
    const id = await conditionEvents.post()
    setLoading(false)
    if (id) {
      navigate.to.conditionEventDetails(id)
    }
  }

  const onClickManageSymptoms = () => {
    navigate.to.manageSymptoms()
  }

  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <ButtonGroup variant="outlined">
        <Button
          variant="contained"
          startIcon={<SickIcon />}
          onClick={onClickAddSymptom}
          loading={loading}
        >
          Neues Symptom
        </Button>
        <Button onClick={onClickManageSymptoms}>
          Symptome verwalten
        </Button>
      </ButtonGroup>
      <EventList />
    </Container>
  )
}
