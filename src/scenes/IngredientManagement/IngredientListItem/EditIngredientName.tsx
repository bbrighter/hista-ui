import { actions } from "../../../actions"
import useHista from "../../../store/store"
import TextFieldSaveAndAbort from "../../components/TextFieldSaveAndAbort"

export const EditIngredientName = ({ id, name, onCancel }:
{
  id: number
  name: string
  onCancel: () => void

}) => {
  const ingredients = useHista(state => state.ingredients)
  const onSave = async (v: string) => {
    await actions.ingredients.changeName(id, v)
    onCancel()
  }

  const isSaveable = (v: string): boolean => {
    return v.trim() != "" && ingredients.every(i => i.name.trim().toLowerCase() != v.trim().toLowerCase())
  }

  return (
    <TextFieldSaveAndAbort
      label="Zutat"
      onCancel={onCancel}
      isSaveable={isSaveable}
      size="small"
      value={name}
      onSave={onSave}
    />
  )
}
