import Container from "@mui/material/Container";
import { useEffect } from "react";

import { medicinesService } from "../../store";
import { IntakeList, ManagementButton } from "./components";

export const Medicines = () => {
  useEffect(() => {
    medicinesService.getMedicines();
    medicinesService.listIntakes();
  });

  return (
    <Container sx={{ mt: "2rem" }}>
      <ManagementButton />
      <IntakeList/>
    </Container>
  );
};
