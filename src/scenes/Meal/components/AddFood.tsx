import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Autocomplete from "@mui/material/Autocomplete"
import CircularProgress from "@mui/material/CircularProgress"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"
import React from "react"

import { ingredientsService,mealService, services } from "../../../store"
import useHista from "../../../store/store"
import { useOptions } from "./useOptions"



type NewOption = string
type InputOption = ReturnType<typeof useOptions>[0]

type Option = InputOption | NewOption

const isNewOption = (v: unknown): v is NewOption => {
  return typeof (v) == "string"
}

const isFoodOption = (v: InputOption) => {
  return v.type == "food"
}

export function AddFood() {
  const mealId = useHista(state => state.meal.id)!
  const options = useOptions()

  const [inputValue, setInputValue] = useState<string | undefined>("")
  const [value, setValue] = useState<Option | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ingredientsService.getIngredients()
    services.template.list()
  }, [])


  const onChange = async (_e: React.SyntheticEvent, value: (Option | null)) => {
    if (value == null) return
    setValue(value)
    setIsLoading(true)
    if (isNewOption(value)) {
      await mealService.postFoodByName(mealId, value)
    } else if (isFoodOption(value)) {
      await mealService.postFoodById(mealId, value.id)
    } else {
      await mealService.postFoodsByTemplate(mealId, value.id)
    }
    setIsLoading(false)
    setInputValue("")
  }

  const onInputChange = (_e: React.SyntheticEvent, v: string) => {
    setInputValue(v)
  }

  return (
    <Autocomplete
      sx={{ mt: "1rem" }}
      options={options}
      freeSolo
      inputValue={inputValue}
      value={value}
      onInputChange={onInputChange}
      onChange={onChange}
      renderOption={(props, option) => {
        const key = isNewOption(option) ? 0 : option.id + option.type
        const label = isNewOption(option) ? option : option.name
        return (
          <ListItem {...props} key={key}>
            <ListItemText primary={label} />
            {!isNewOption(option) && option.type == "template" && <ListItemIcon><ContentPasteIcon/></ListItemIcon>}
          </ListItem>
        )
      }}
      getOptionLabel={opt => isNewOption(opt) ? opt : opt.name}
      renderInput={params => (
        <TextField
          {...params}
          label="Zutaten"
          slotProps={{
            input: { 
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? <CircularProgress size={30} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  )
}
