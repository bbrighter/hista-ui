import { useEffect, useMemo, useState } from "react"

import { ingredientsService, services } from "../../../store"
import useHista from "../../../store/store"
import { OverviewList } from "../../components";
import { TemplateDialog } from "./TemplateDraft";

export const TemplateList = () => {
  const [editId, setEditId] = useState<number| null>(null)

  useEffect(() => {
    ingredientsService.getIngredients()
  }, [])

  const templates = useHista(state => state.templates)
  const items = useMemo(() => (Object.entries(templates).map(([id, t]) => ({ id: Number(id), date: t.name }))), [templates])
  const onDelete = (id: number) => services.template.delete(id)

  return (
    <>
      <OverviewList 
        items={items} 
        onClick={(id) => setEditId(id)} 
        onDelete={onDelete}  
        getData={services.template.list} 
      />
      <TemplateDialog open={editId != null} onClose={() => setEditId(null)} templateId={editId}/>
    </>

  )
}