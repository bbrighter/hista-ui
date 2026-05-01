import AccordionSummary from "@mui/material/AccordionSummary"
import Box from "@mui/material/Box"
import ButtonGroup from "@mui/material/ButtonGroup"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { useState } from "react"

import { actions } from "../../../actions"
import { SymptomCategory, useIsCategoryNameAvailable } from "../../../store"
import { Icons } from "../../components/Icons"
import TextFieldSaveAndAbort from "../../components/TextFieldSaveAndAbort"

export default function AccordionCategory(props: {
  category: SymptomCategory
}) {
  const [mode, setMode] = useState<"default" | "editing" | "deleting">("default")
  const [isLoading, setIsLoading] = useState(false)
  const isUniqueName = useIsCategoryNameAvailable()

  const isSaveable = (v: string): boolean => (isUniqueName(v))
  const isDeletable = props.category.symptoms.length == 0
  const onSave = async (v: string) => {
    setIsLoading(true)
    await actions.symptoms.patchCategoryName(props.category.categoryId, v)
    setIsLoading(false)
    setMode("default")
  }

  const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsLoading(true)
    await actions.symptoms.deleteCategory(props.category.categoryId)
    setIsLoading(false)
    setMode("default")
  }

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setMode("default")
  }

  return (
    <AccordionSummary expandIcon={<Icons.actions.expand titleAccess="Ausklappen" />} component="div">
      {
        mode == "default"
        && (
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
            onClick={e => e.stopPropagation()}
          >
            <Typography variant="h6" sx={{ pt: "12px", pb: "12px" }}>
              {props.category.categoryName}
              {" "}
              (
              {props.category.symptoms.length}
              )
            </Typography>
            <ButtonGroup>
              <IconButton
                onClick={() => setMode("editing")}
                title="Kategorie umbenennen"
              >
                <Icons.actions.edit />
              </IconButton>
              <IconButton
                onClick={() => setMode("deleting")}
                disabled={!isDeletable}
                color="error"
                title="Löschen"
              >
                <Icons.actions.delete />
              </IconButton>
            </ButtonGroup>
          </Box>
        )
      }
      {
        mode == "editing"
        && (
          <TextFieldSaveAndAbort
            label="Kategoriename"
            isSaveable={isSaveable}
            onCancel={onCancel}
            onSave={onSave}
            size="medium"
            value={props.category.categoryName}
          />
        )
      }
      {
        mode == "deleting"
        && (
          <>
            <Typography variant="h6" sx={{ pt: "12px", pb: "12px" }}>
              {props.category.categoryName}
              {" "}
              wirklich löschen?
            </Typography>
            <ButtonGroup sx={{ pl: 2 }}>
              <IconButton
                loading={isLoading}
                onClick={onDelete}
                title="Löschen bestätigen"
              >
                <Icons.actions.delete />
              </IconButton>
              <IconButton
                onClick={onCancel}
                color="error"
                title="Löschen abbrechen"
              >
                <Icons.actions.close />
              </IconButton>
            </ButtonGroup>
          </>
        )
      }
    </AccordionSummary>
  )
}
