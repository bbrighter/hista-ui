import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"

export const Loading = ({ show, children }: {show: boolean, children: React.ReactNode}) => {
  return (
    <Box> 
      {children}
      <Backdrop 
        data-testid="loading-spinner" 
        open={show} 
        transitionDuration={{ exit: 200 }}
        sx={{ 
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(2px)",
          zIndex: (theme) => theme.zIndex.modal,
        }}
      >
      </Backdrop>
    </Box>
  )
}