import "dayjs/locale/de"

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"

import useDebounce from "../../hooks/useDebounce"
import { useDidUpdateEffect } from "../../hooks/useDidUpdateEffect"

export default function DateInput(props: {
  title: string
  date: Date
  onChange: ((value: dayjs.Dayjs | null) => void)
  hideTime?: boolean
}) {
  const [inputValue, setInputValue] = useState(dayjs(props.date))
  const debouncedInputValue = useDebounce(inputValue, 500)
  const isUserInteractionRef = useRef(false)

  useEffect(() => {
    if (!isUserInteractionRef.current) {
      setInputValue(dayjs(props.date))
    }
    isUserInteractionRef.current = false
  }, [props.date])

  useDidUpdateEffect(() => {
    if (isUserInteractionRef.current) {
      props.onChange(debouncedInputValue)
    }
    
  }, [debouncedInputValue])

  const handleInputChange = (value: dayjs.Dayjs | null) => {
    if (value != null) {
      isUserInteractionRef.current = true
      setInputValue(value)
    }
  }
  const hideTime = !!props.hideTime

  return (
    <LocalizationProvider 
      dateAdapter={AdapterDayjs} 
      adapterLocale="de"
      localeText={{
        todayButtonLabel: "Jetzt",
        okButtonLabel: "Ok",
        cancelButtonLabel: "Abbrechen",
      }}
    >
      {hideTime && (
        <DatePicker
          sx={{ width: "99%" }}
          label={props.title}
          value={inputValue}
          onChange={handleInputChange}

        />
      )}
      {!hideTime
        && (
          <DateTimePicker
            sx={{ width: "99%" }}
            label={props.title}
            value={inputValue}
            onChange={handleInputChange}
            slotProps={{ 
              actionBar: {
                actions: ["today", "cancel", "accept"],
              },
            }}
          />
        )}
    </LocalizationProvider>
  )
}
