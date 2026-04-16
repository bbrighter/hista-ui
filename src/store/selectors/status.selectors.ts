import { Dayjs } from "dayjs"

import useHista from "../store"

export const useStatus = () => {
  const statuses = useHista(state => state.statuses)
  return [...statuses].sort((a,b) => b.date.diff(a.date))
}

export const useStatusExistsOnDay = (day: Dayjs) => {
  const statuses = useHista(state => state.statuses)
  const isLoaded = useHista(state => state.loaded)
  if (!isLoaded["statuses"]) return true
  return statuses.some(s => s.date.isSame(day, "day"))
}