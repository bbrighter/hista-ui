import Button from "@mui/material/Button";
import { useState } from "react";

import { actions } from "../../../actions";
import useHista from "../../../store/store";
import TextFieldSaveAndAbort from "../../components/TextFieldSaveAndAbort";

export const AddMedicineButton = () => {
  const [isAdding, setIsAdding] = useState(false);
  const medicineNames = useHista((state) => state.medicines).map((m) => m.name);

  const onAddClick = () => setIsAdding(true);
  const onCancel = () => setIsAdding(false);

  const isSaveable = (v: string) => {
    if (v.trim() == "") {
      return false;
    }
    if (medicineNames.includes(v.trim())) {
      return false;
    }
    return true;
  };

  const onSave = async (v: string) => {
    await actions.medicines.create(v);
    onCancel();
  };

  return !isAdding ? (
    <Button variant="contained" onClick={onAddClick}>
      Medikament hinzufügen
    </Button>
  ) : (
    <>
      <TextFieldSaveAndAbort
        label="Medikament"
        value=""
        isSaveable={isSaveable}
        onSave={onSave}
        onCancel={onCancel}
        size="medium"
      />
    </>
  );
};
