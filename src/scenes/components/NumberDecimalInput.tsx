import TextField, { TextFieldProps } from "@mui/material/TextField"

export const NumberDecimalInput = (
  { value, onValueChange, unit, min, ...other } : TextFieldProps & {
    value: number | null,
    onValueChange: (v: number | null) => void,
    min?: number
    unit?: string
  },
) => {

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    if (value == "") {
      onValueChange(null)
      return
    }
    if (/[0-9]*[.]*[0-9]*/.test(value)) {
      const normalizedValue = value.replace(",",".")
      const numericValue = parseFloat(normalizedValue)
      if (isNaN(numericValue)) return
      if (min != undefined && numericValue < min) return
      onValueChange(parseFloat(normalizedValue))
      return
    }
  }

  return (
    <TextField
      value={value}
      onChange={onChange}
      type="number"
      slotProps={{
        input: {
          endAdornment: unit, 
        },
      }}
      {...other}
    />
  )
}