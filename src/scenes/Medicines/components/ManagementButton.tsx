import Button from "@mui/material/Button";

import { useAppNavigate } from "../../../hooks/useNavigate";

export const ManagementButton = () => {
  const navigate = useAppNavigate();
  return (
    <Button variant="outlined" onClick={navigate.to.manageMedicine}>
      Medikamente verwalten
    </Button>
  );
};
