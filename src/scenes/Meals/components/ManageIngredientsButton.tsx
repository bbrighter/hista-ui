import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";

import { useAppNavigate } from "../../../hooks/useNavigate"

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
      <SortIcon/>
    </IconButton>
  )
}