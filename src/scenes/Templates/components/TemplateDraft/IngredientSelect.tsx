import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

import { Ingredient, useNonArchivedIngredients } from "../../../../store"

export const IngredientSelect = ({ ingredient, onChange }: {ingredient: Ingredient | null, onChange: (v: Ingredient | null) => void}) => {
  const ingredients = useNonArchivedIngredients()

  return (
    <Autocomplete 
      sx={{ width: "75%" }}
      options={ingredients} 
      renderInput={(params) => <TextField {...params} /> } 
      getOptionKey={o => o.id}   
      getOptionLabel={o => o.name}
      value={ingredient}
      onChange={(_e, v) => onChange(v)}
    />
  )
}