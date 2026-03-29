import Slider from "@mui/material/Slider"
import { useState } from "react"

import useDebounce from "../../../hooks/useDebounce"
import { useDidUpdateEffect } from "../../../hooks/useDidUpdateEffect"
import { colorFromSeverity, services } from "../../../store"

export default function Severity(props: {
  severity: number
  conditionId: number
}) {
//   const patchSeverity = useHista(state => state.patchCondition)
  const [severity, setSeverity] = useState(props.severity)
  const debouncedSeverity = useDebounce(severity, 750)

  useDidUpdateEffect(() => {
    services.conditions.patchSeverity(props.conditionId, severity)
  }, [debouncedSeverity])

  const onChangeSeverity = (_event: unknown, value: number | number[]) => {
    if (typeof (value) == "number") {
      setSeverity(value)
    }
  }

  return (
    <Slider
      sx={{ maxWidth: "50%", marginRight: "30px" }}
      min={1}
      max={5}
      value={severity}
      onChange={onChangeSeverity}
      color={colorFromSeverity(severity)}
    />
  )
}
