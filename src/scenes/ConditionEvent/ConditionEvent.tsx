import Container from "@mui/material/Container"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import dayjs from "dayjs"
import { useParams } from "react-router-dom"

import { actions } from "../../actions"
import { usePiidEffect } from "../../hooks/usePiidEffect"
import { selectIsLoadingAny } from "../../store"
import useHista from "../../store/store"
import { Loading } from "../components"
import DateInput from "../components/DateInput"
import AddCondition from "./components/AddCondition"
import ConditionList from "./components/ConditionList"

export default function ConditionEvent() {
  const isLoading = useHista(selectIsLoadingAny(["conditionEvent", "symptoms"]))
  const conditionEvent = useHista(state => state.conditionEvent)
  const params = useParams<{ eventId: string }>()

  usePiidEffect(() => {
    actions.conditionEvents.get(Number(params.eventId))
  },
  [params.eventId])

  const onChange = (v: dayjs.Dayjs | null) => {
    if (!params.eventId) return
    if (v === null) return
    actions.conditionEvents.patchDate(Number(params.eventId), v.toDate())
  }

  return (
    <Loading show={isLoading}>
      <Container sx={{ padding: "2rem" }}>
        <FormGroup>
          <DateInput
            date={conditionEvent.date}
            title="Symptome"
            onChange={onChange}
          />
          <FormControl>
            <AddCondition />
          </FormControl>
        </FormGroup>
        <ConditionList />
      </Container>
    </Loading>
  )
}
