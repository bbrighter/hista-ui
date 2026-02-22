import Container from "@mui/material/Container";

import { usePiidEffect } from "../../hooks/usePiidEffect";
import { medicinesService } from "../../store";
import { AddMedicineButton, MedicineList } from "./components";

export const MedicineManagement = () => {
  usePiidEffect(() => {
    medicinesService.getMedicines();
  }, []);

  return (
    <Container sx={{ mt: "2rem" }}>
      <AddMedicineButton />
      <MedicineList/>
    </Container>
  );
};
