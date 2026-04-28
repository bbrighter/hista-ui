import IconButton from "@mui/material/IconButton";

import { useAppNavigate } from "../../../hooks/useNavigate"
import { Icons } from "../../components/Icons";

export const ManageIngredientsButton = () => {
  const navigate = useAppNavigate()

  const onManageClick = () => {
    navigate.to.manageIngredients()
  }

  return (
    <IconButton 
      data-testid="manage-ingredients-button"
      onClick={onManageClick}
      color="primary"
    >
      <Icons.manage/>
    </IconButton>
  )
}