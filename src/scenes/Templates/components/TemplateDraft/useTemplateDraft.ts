import { useEffect, useState } from "react";

import { Ingredient, useTemplate } from "../../../../store";
import { DraftTemplate } from "./draftTemplate.type";

export const useTemplateDraft = (id?: number | null) => {
  const [name, setName] = useState("")
  const [draft, setDraft] = useState<DraftTemplate>([{ ingredient: null, condition: "cooked" }])

  const template = useTemplate(id)

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