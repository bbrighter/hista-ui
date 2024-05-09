import { Slider } from "@mui/material"
import { useState } from "react"
import useDebounce from "../../../hooks/useDebounce"
import useHista from "../../../store/store"
import { useDidUpdateEffect } from "../../../hooks/useDidUpdateEffect"

export default function Severity(props: {
    severity: number
    conditionId: number
}) {
    const patchSeverity = useHista(state => state.patchCondition)
    const [severity, setSeverity] = useState(props.severity)
    const debouncedSeverity = useDebounce(severity, 750)

    useDidUpdateEffect(() => {
        patchSeverity(props.conditionId, severity)
    }, [debouncedSeverity])

    const color = (severity: number) => {
        switch (severity) {
            case 1:
                return "success"
            case 2:
                return "primary"
            case 3:
                return "secondary"
            case 4:
                return "warning"
            case 5:
                return "error"
        }
    }

    const onChangeSeverity = (_event: unknown, value: number | number[]) => {
        if (typeof (value) == 'number') {
            setSeverity(value)
        }
    }

    return (
        <Slider
            sx={{ maxWidth: '50%', marginRight: '30px' }}
            min={1}
            max={5}
            value={severity}
            onChange={onChangeSeverity}
            color={color(severity)}
        />
    )
}