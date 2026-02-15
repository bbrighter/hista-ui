import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useEffect, useState } from "react"

import { ingredientsService } from "../../../../store/service/ingredients.service"
import useHista from "../../../../store/store"

export default function IngredientSelect({ onChange }: {
  onChange: (id: number) => void
}) {
  const ingredients = useHista(state => state.ingredients)
  const sortedIngredients = [...ingredients].sort((a, b) => a.name.localeCompare(b.name))
  const [value, setValue] = useState(0)

  useEffect(() => {
    ingredientsService.getIngredients()
  }, [])

  const handleChange = (e: SelectChangeEvent<number>) => {
    const newValue = Number(e.target.value)
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <Select
      sx={{ width: "10rem" }}
      value={value}
      onChange={handleChange}
      data-testid="ingredientSelect"
    >
      <MenuItem key="" value={0}>-</MenuItem>
      {sortedIngredients.map(i =>
        (<MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>),
      )}
    </Select>
  )
}
