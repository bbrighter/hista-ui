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
import NumberField from "../../components/NumberField";

export const EditNutritionButton = ({ id, nutrition }: {id: number, nutrition?: Nutrition}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const onClose  = () => setOpen(false)

  const [carbohydrate, setCarbohydrate] = useState(nutrition?.carbohydrate)
  const [protein, setProtein] = useState(nutrition?.protein)
  const [fat, setFat] = useState(nutrition?.fat)
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

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
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
            <NumberField label="Fett" unit="g" 
              value={fat}
              onValueChange={setFat}/>
            <NumberField label="Kohlenhydrate" unit="g" 
              value={carbohydrate}
              onValueChange={setCarbohydrate}
            />
            <NumberField label="Ballaststoffe" unit="g" 
              value={fiber}
              onValueChange={setFiber}
            />
            <NumberField label="Eiweiß" unit="g" 
              value={protein}
              onValueChange={setProtein}
            />  
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
