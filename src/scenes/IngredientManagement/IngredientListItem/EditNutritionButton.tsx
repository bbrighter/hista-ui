import ScienceIcon from "@mui/icons-material/Science";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton"
import { useState } from "react";

import { ingredientsService, Nutrition } from "../../../store";
import { NumberDecimalInput } from "../../components/NumberDecimalInput";

export const EditNutritionButton = ({ id, nutrition }: {id: number, nutrition?: Nutrition}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const onClose  = () => setOpen(false)

  const [carbohydrate, setCarbohydrate] = useState(nutrition?.carbohydrate)
  const [protein, setProtein] = useState(nutrition?.protein)
  const [fat, setFat] = useState<null | number>(nutrition?.fat || null)
  const [fiber, setFiber] = useState(nutrition?.fiber)

  const canBeSaved = 
    carbohydrate != undefined && 
    protein != undefined && 
    fat != undefined && 
    fiber != undefined && 
    carbohydrate + protein + fat + fiber < 100

  const onSave = async () => {
    setLoading(true)
    await ingredientsService.updateNutrition(id, { carbohydrate, protein, fat, fiber })
    setLoading(false)
    setOpen(false)
  }

  const nutritions = [
    { value: fat, onChange: setFat, label: "Fett" },
    { value: carbohydrate, onChange: setCarbohydrate, label: "Kohlenhydrate" },
    { value: fiber, onChange: setFiber, label: "Ballaststoffe" },
    { value: protein, onChange: setProtein, label: "Eiweiß" },
  ]

  return (
    <>
      <IconButton 
        title="Nährwerte"
        onClick={() => setOpen(true)}
        data-testid="editNutritionButton"
      >
        <ScienceIcon/>
      </IconButton>
      <Dialog 
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Nährwerte pro 100 g</DialogTitle>
        <DialogContent>
          <Box 
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            {nutritions.map(n => (
              <NumberDecimalInput 
                key={n.label}
                value={n.value}
                onValueChange={n.onChange}
                variant="standard"
                label={n.label}
                unit="g"
                min={0}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained"
            disabled={!canBeSaved}
            onClick={onSave}
            loading={loading}
          >Speichern</Button>
          <Button onClick={onClose}>Abbrechen</Button>
        </DialogActions>       
      </Dialog>
    </>
  )
}

