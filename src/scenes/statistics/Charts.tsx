import { useEffect, useState } from "react"
import useHista from "../../store/store"
import DateInput from "../components/DateIpnut"
import dayjs from "dayjs"
import SymptomSelect from "./components/SymptomSelect"
import SymptomEvaluation from "./components/SymptomEvaluation"


export default function Charts() {
    const getStatistics = useHista(state => state.getStatistics)

    const today = new Date()
    const [fromDate, setFromDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7))
    const [toDate, setToDate] = useState(today)
    const [ids, setIds] = useState<Array<number>>([])

    useEffect(() => {
        if (ids.length > 0) {
            getStatistics(fromDate, toDate, ids)
        }
    }, [fromDate, getStatistics, ids, toDate])

    const handleFromDateChange = (value: dayjs.Dayjs | null) => {
        if (value != null) setFromDate(new Date(value.toISOString()))
    }

    const handleToDateChange = (value: dayjs.Dayjs | null) => {
        if (value != null) setToDate(new Date(value.toISOString()))
    }

    const handleSymptomChange = (ids: Array<number>) => {
        setIds(ids)
    }

    return (
        <>
            <DateInput
                title="Von"
                onChange={handleFromDateChange}
                date={fromDate}
                hideTime
            />
            <DateInput
                title="Bis"
                onChange={handleToDateChange}
                date={toDate}
                hideTime
            />
            <SymptomSelect onChange={handleSymptomChange} />
            <SymptomEvaluation />
        </>
    )
}