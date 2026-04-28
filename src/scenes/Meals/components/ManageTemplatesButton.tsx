import IconButton from "@mui/material/IconButton";

import { useAppNavigate } from "../../../hooks/useNavigate"
import { Icons } from "../../components/Icons";

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
    ><Icons.template/></IconButton>
  )
}