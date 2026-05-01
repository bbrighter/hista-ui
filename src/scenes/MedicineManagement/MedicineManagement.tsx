import Container from "@mui/material/Container";

import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import { selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";
import { AddMedicineButton, MedicineList } from "./components";

export const MedicineManagement = () => {
  const isLoading = useHista(selectIsLoadingAny(["medicines"]))
  usePiidEffect(() => {
    actions.medicines.list();
  }, []);

  return (
    <Loading show={isLoading}>
      <Container sx={{ mt: "2rem" }}>
        <AddMedicineButton />
        <MedicineList/>
      </Container>
    </Loading>
  );
};
