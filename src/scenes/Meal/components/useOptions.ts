import { useNonArchivedIngredients } from "../../../store"
import useHista from "../../../store/store"

type OptionType = "food" | "template"

type InputOption = {
  id: number
  name: string
  type: OptionType
}


export const useOptions = () => {
  const ingredients = useNonArchivedIngredients()
  const templates = useHista(state => state.templates)
  const options: Array<InputOption> = [
    ...ingredients.map(ing => ({ name: ing.name, id: ing.id, type: "food" as OptionType })),
    ...Object.entries(templates).map(([id, t]) => ({ name: t.name, id: Number(id), type: "template" as OptionType })),
  ]

  return options
}