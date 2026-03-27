import { client } from "../../api/api";
import useHista from "../store";
import { Nutrition, respToIngredients } from "../types";

export const ingredientsService = {
  getIngredients: async () => {
    const { setIngredients, ingredients } = useHista.getState();
    if (ingredients.length > 0) return
    
    const resp = await client.ListIngredients();

    setIngredients(respToIngredients(resp));
  },

  deleteIngredient: async (id: number) => {
    const { setIngredients, ingredients } = useHista.getState();
    try {
      await client.DeleteIngredient(id);
      setIngredients(ingredients.filter((i) => i.id != id));
      return true;
    } catch {
      return false;
    }
  },

  changeName: async (id: number, newName: string) => {
    const { setIngredients, ingredients } = useHista.getState();
    await client.PatchIngredient(id, { name: newName.trim() });
    setIngredients(
      ingredients.map((i) => {
        return i.id == id ? { ...i, name: newName } : i;
      }),
    );
  },

  archive: async (id: number) => {
    const { updateIngredient, ingredients } = useHista.getState();
    const isCurrentlyArchived = ingredients.find(i => i.id == id).isArchived
    await client.PatchIngredient(id, { archived: !isCurrentlyArchived })
    updateIngredient(id, { isArchived: !isCurrentlyArchived })
  },

  updateNutrition: async (id: number, nutrition: Nutrition) => {
    const { updateIngredient } = useHista.getState()

    await client.PatchIngredient(id, { nutrition: {
      carbohydrate: nutrition.carbohydrate,
      fat: nutrition.fat,
      fiber: nutrition.fiber,
      protein: nutrition.protein,
    } })

    updateIngredient(id, { nutrition: nutrition })
  },


};
