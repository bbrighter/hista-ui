import Container from "@mui/material/Container";

import { usePiidEffect } from "../../hooks/usePiidEffect";
import { medicinesService, selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";
import { IntakeList, ManagementButton } from "./components";

export const Medicines = () => {
  const isLoading = useHista(selectIsLoadingAny(["medicines", "intakes"]))
  usePiidEffect(() => {
    medicinesService.getMedicines();
    medicinesService.listIntakes();
  }, []);

  return (
    <Loading show={isLoading}>
      <Container sx={{ mt: "2rem" }}>
        <ManagementButton />
        <IntakeList/>
      </Container>
    </Loading>
  );
};
