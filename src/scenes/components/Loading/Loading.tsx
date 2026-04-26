import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

export const Loading = ({ show, children }: {show: boolean, children: React.ReactNode}) => {
  return (
    <Box> 
      {children}
      <Backdrop 
        open={show} 
        sx={{ 
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(1px)",  
          zIndex: (theme) => theme.zIndex.modal,
        }}
      >
        <CircularProgress
          data-testid="loading-spinner" 
          size={60}
        />
      </Backdrop>
    </Box>
  )
}