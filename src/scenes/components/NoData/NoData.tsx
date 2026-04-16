import Box from "@mui/material/Box"

type NoDataProps = {
  show: boolean
  src: string
}

export const NoData = ({ show, src }: NoDataProps) => {
  if (show) {
    return (
      <Box sx={{ alignContent: "center", justifyContent: "center", display: "flex", pt: 5 }}
        data-testid="no-pills-image">
        <Box
          component="img"
          sx={{ width: "50%" }}
          src={src}
          alt="No data available" // Needed for testing
        />
      </Box>)
  } else {return (<></>)}
}