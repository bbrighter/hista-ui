import Container from "@mui/material/Container";

import { usePiidEffect } from "../../hooks/usePiidEffect";
import { medicinesService } from "../../store";
import { IntakeList, ManagementButton } from "./components";

export const Medicines = () => {
  usePiidEffect(() => {
    medicinesService.getMedicines();
    medicinesService.listIntakes();
  }, []);

  return (
    <Container sx={{ mt: "2rem" }}>
      <ManagementButton />
      <IntakeList/>
    </Container>
  );
};
