import dayjs from "dayjs"

import { services, useNote } from "../../../store"
import DateInput from "../../components/DateInput"

export const NoteDateInput = ({ noteId }: {noteId: number}) => {
  const note = useNote(noteId)
  const date = note.date

  const onDateChange = (e: dayjs.Dayjs | null) => {
    services.notes.patchDate(noteId, e.toDate())
  }

  return (
    <DateInput
      title="Zeit"
      date={date}
      onChange={onDateChange}
    />
  )
}