import { useEffect, useMemo, useState } from "react";

import { Ingredient } from "../../../../store";
import useHista from "../../../../store/store";
import { DraftTemplate } from "./draftTemplate.type";


export const useTemplate = (id: number | null | undefined) => {
  const templates = useHista(state => state.templates)
  const ingredients = useHista(state => state.ingredients)

  return useMemo(() => {  
    if (!id) return null

    const ingredientMap = new Map(ingredients.map(i => [i.id, i]))
  
    const template = templates[id]  
    if (!template) return null
    return {
      name: template.name,
      items: template.items.map(i => {
        const id = i.ingredientId
        const ingredient = ingredientMap.get(i.ingredientId)
        return {
          ingredient: {
            id: id,
            isArchived: ingredient?.isArchived ?? true,
            name: ingredient?.name ?? "",
          } satisfies Ingredient,
          condition: i.condition,
        }}),
    }}, [id, templates, ingredients])

}


export const useTemplateDraft = (id?: number | null) => {
  const template = useTemplate(id)
  const [name, setName] = useState("")
  const [draft, setDraft] = useState<DraftTemplate>([{ ingredient: null, condition: "cooked" }])

  useEffect(() => {
    if (template) {
      setName(template.name)
      setDraft(template.items)
    }
  },[id])

  const onChangeName = (v: string) => {
    setName(v)
  }

  const canBeSaved = () => {
    if (name.trim() == "") {
      return false
    }
    if (draft.length == 0 ||  draft.every(d => d.ingredient == null)) {
      return false
    }
    return true
  }

  const onChangeIngredient = (idx: number, ingredient: Ingredient | null) => {
    setDraft(prev =>
      prev.map((row, i) => i === idx ? { ...row, ingredient } : row),
    );
  };

  const onAdd = () => {
    setDraft(prev => [...prev, { ingredient: null, condition: "cooked" }]);
  };

  const onDelete = (idx: number) => {
    setDraft(prev => prev.filter((_, i) => i !== idx));
  };

  const onChangeCondition = (idx: number) => {
    setDraft(prev =>
      prev.map((row, i) =>
        i === idx
          ? { ...row, condition: row.condition === "cooked" ? "raw" : "cooked" }
          : row,
      ),
    );
  };

  return { draft, name, canBeSaved, onChangeIngredient, onAdd, onDelete, onChangeCondition, onChangeName };
};

export type DraftStateType = ReturnType<typeof useTemplateDraft>