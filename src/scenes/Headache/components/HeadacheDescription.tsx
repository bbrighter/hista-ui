import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import { useEffect, useRef, useState } from "react"

import { actions } from "../../../actions"
import useDebounce from "../../../hooks/useDebounce"
import { useDidUpdateEffect } from "../../../hooks/useDidUpdateEffect"
import useHista from "../../../store/store"

export default function HeadacheDescription() {
  const firstUpdateRef = useRef(true)
  const description = useHista(state => state.headache.description)
  const id = useHista(state => state.headache.id)

  const [textInput, setTextInput] = useState("")
  const [isDirty, setIsDirty] = useState(false)
  const debouncedValue = useDebounce(textInput, 1000)

  useEffect(() => {
    if (firstUpdateRef.current) {
      setTextInput(description)
    }
  }, [description])

  useDidUpdateEffect(() => {
    if (firstUpdateRef.current) {
      firstUpdateRef.current = false
      return
    }
    actions.headaches.patchDescription(id, debouncedValue).then(() => setIsDirty(false))
  }, [debouncedValue])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value)
    setIsDirty(true)
  }

  return (
    <>
      <Divider sx={{ pt: 1 }} />
      <TextField
        sx={{ mt: 2 }}
        label="Zusätzliche Infos"
        multiline
        minRows={3}
        value={textInput}
        fullWidth
        color={isDirty ? "secondary" : "primary"}
        onChange={onChange}
      />
    </>
  )
}
