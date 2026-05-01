import { useEffect, useMemo, useState } from "react"

import { actions } from "../../../actions";
import useHista from "../../../store/store"
import { NoData, OverviewList } from "../../components";
import { TemplateDialog } from "./TemplateDraft";

export const TemplateList = () => {
  const [editId, setEditId] = useState<number| null>(null)

  useEffect(() => {
    actions.ingredients.list()
  }, [])

  const templates = useHista(state => state.templates)
  const items = useMemo(() => (Object.entries(templates).map(([id, t]) => ({ id: Number(id), date: t.name }))), [templates])
  const onDelete = (id: number) => actions.templates.delete(id)
  const showNoData = Object.keys(templates).length == 0

  return (
    <>
      <NoData show={showNoData} src="/templates.svg"/>
      <OverviewList 
        items={items} 
        onClick={(id) => setEditId(id)} 
        onDelete={onDelete}  
        getData={actions.templates.list} 
      />
      <TemplateDialog open={editId != null} onClose={() => setEditId(null)} templateId={editId}/>
    </>

  )
}