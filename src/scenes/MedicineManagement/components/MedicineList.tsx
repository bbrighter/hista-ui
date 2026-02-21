
import List from "@mui/material/List"

import { useMedicine } from "../../../store"
import { MedicineListItem } from "./MedicineListItem"

export const MedicineList = () => {
  const medicines = useMedicine()

  return (
    <List>
      {medicines.map(m => <MedicineListItem key={m.id} medicine={m} />)}
    </List>
  )
}

