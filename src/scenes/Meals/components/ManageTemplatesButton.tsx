import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import IconButton from "@mui/material/IconButton";

import { useAppNavigate } from "../../../hooks/useNavigate"

export const ManageTemplatesButton = () => {
  const navigate = useAppNavigate()

  const onManageClick = () => {
    navigate.to.templates()
  }

  return (
    <IconButton 
      data-testid="manage-templates-button"
      onClick={onManageClick}
      color="primary"
    ><DinnerDiningIcon/></IconButton>
  )
}