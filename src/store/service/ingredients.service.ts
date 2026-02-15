import { client } from '../../api/api'
import useHista from '../store'
import { respToIngredients } from '../types'

export const ingredientsService = {
  getIngredients: async () => {
    const resp = await client.ListIngredients()

    const { setIngredients, setIngredientsAreLoaded } = useHista.getState()
    setIngredients(respToIngredients(resp))
    setIngredientsAreLoaded()
  },

  deleteIngredient: async (id: number) => {
    const { setIngredients, ingredients } = useHista.getState()
    try {
      await client.DeleteIngredient(id)
      setIngredients(ingredients.filter(i => i.id != id))
      return true
    }
    catch {
      return false
    }
  },

  changeName: async (id: number, newName: string) => {
    const { setIngredients, ingredients } = useHista.getState()
    await client.PatchIngredient(id, { name: newName })
    setIngredients(ingredients.map((i) => {
      return i.id == id ? { ...i, name: newName } : i
    }))
  },

  archive: async (id: number) => {
    const { setIngredients, ingredients } = useHista.getState()
    await client.ArchiveIngredient(id)
    setIngredients(ingredients.map((i) => {
      return i.id == id ? { ...i, isArchived: !i.isArchived } : i
    }))
  },
}
