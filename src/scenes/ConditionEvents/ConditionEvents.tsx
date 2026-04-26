import SickIcon from "@mui/icons-material/Sick"
import SortIcon from "@mui/icons-material/Sort";
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack";
import { useState } from "react"

import { useAppNavigate } from "../../hooks/useNavigate"
import { conditionEvents, selectIsLoadingAny } from "../../store"
import useHista from "../../store/store";
import { Loading } from "../components";
import EventList from "./components/EventList"

export default function ConditionEvents() {
  const isLoading = useHista(selectIsLoadingAny(["conditionEvents"]))
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
    <Loading show={isLoading}>
      <Container sx={{ paddingTop: "2rem" }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<SickIcon />}
            onClick={onClickAddSymptom}
            loading={loading}
          >
            Neues Symptom
          </Button>
          <IconButton 
            data-testid="manage-symptoms-button"
            color="primary" 
            onClick={onClickManageSymptoms}>
            <SortIcon/>
          </IconButton>
        </Stack>
        <EventList />
      </Container>
    </Loading>
  )
}
