
import List from "@mui/material/List"

import { useMedicine } from "../../../store"
import { MedicineListItem } from "./MedicineListItem"
import { NoData } from "./NoData"

export const MedicineList = () => {
  const medicines = useMedicine()

  return (
    <>
      <NoData/> 
      <List>
        {medicines.map(m => <MedicineListItem key={m.id} medicine={m} />)}
      </List>
    </>
  )
  
}

