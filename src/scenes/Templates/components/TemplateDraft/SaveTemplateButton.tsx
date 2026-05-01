import Button from "@mui/material/Button"
import { useState } from "react";

import { services } from "../../../../store";
import { Icons } from "../../../components/Icons";
import { DraftStateType } from "./useTemplateDraft";

type SaveTemplateButtonProps = {
  onSaved: () => void,
  id?: number | null
} & DraftStateType

export const SaveTemplateButton = ({ name, draft, canBeSaved, onSaved, id }: SaveTemplateButtonProps) => {
  const [loading, setLoading] = useState(false)
  
  const onSave = async () => {
    const items = draft.
      filter(d => d.ingredient != null).
      map(d => (
        { ingredientId: d.ingredient!.id, condition: d.condition }
      ))
    setLoading(true)
    if (!id) { 
      await services.template.add(name, items)
    } else {
      await services.template.change(id, name, items)
    }
    
    setLoading(false)
    onSaved()
  }

  return (
    <Button 
      data-testid="save-button"
      color="success" 
      startIcon={<Icons.actions.save/>} 
      variant="contained"
      onClick={onSave}
      disabled={!canBeSaved()}
      loading={loading}
    >
      Speichern
    </Button>
  )
    
}