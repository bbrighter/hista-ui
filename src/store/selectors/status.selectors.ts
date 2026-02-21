import { Dayjs } from "dayjs"

import useHista from "../store"

export const useStatus = () => {
  const statuses = useHista(state => state.statuses)
  return [...statuses].sort((a,b) => b.date.diff(a.date))
}

export const useStatusExistsOnDay = (day: Dayjs) => {
  return useHista(state => state.statuses).
    some(s => s.date.isSame(day, "day"))
}