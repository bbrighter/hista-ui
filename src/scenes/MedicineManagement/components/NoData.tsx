import Box from "@mui/material/Box"

import { useMedicine } from "../../../store"

export const NoData = () => {
  const medicines = useMedicine()
  if (medicines.length == 0) {
    return (           
      <Box sx={{ alignContent: "center", justifyContent: "center", display: "flex", pt: 5 }}
        data-testid="no-pills-image">
        <Box
          component="img"
          sx={{ width: "50%" }}
          src="/pills.svg"
          alt="No medicines available" // Needed for testing
        />
      </Box>)
  } else {
    return (<></>)
  }
}