import Container from "@mui/material/Container";
import { useEffect } from "react";

import { medicinesService } from "../../store";
import { AddMedicineButton, MedicineList } from "./components";

export const MedicineManagement = () => {
  useEffect(() => {
    medicinesService.getMedicines();
  }, []);

  return (
    <Container sx={{ mt: "2rem" }}>
      <AddMedicineButton />
      <MedicineList/>
    </Container>
  );
};
