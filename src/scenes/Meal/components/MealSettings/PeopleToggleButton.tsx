import PeopleIcon from "@mui/icons-material/People"
import PersonIcon from "@mui/icons-material/Person"
import CircularProgress from "@mui/material/CircularProgress"
import Skeleton from "@mui/material/Skeleton"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

type PeopleToggleButtonProps = {
  isLoading: boolean
  isAlone: boolean
  handleToggleOptionChange: (value: boolean | null) => void
}

export const PeopleToggleButton = ({ isLoading, isAlone, handleToggleOptionChange }: PeopleToggleButtonProps) => {
  return (
    <>
      {isLoading
        ? <Skeleton variant="rectangular" height="3rem" />
        : (
          <ToggleButtonGroup
            exclusive
            value={isAlone}
            onChange={(_e,v) => handleToggleOptionChange(v)}
          >
            <ToggleButton
              sx={{ width: "3rem" }}
              value={true}
              title="Alleine"
            >
              {isLoading == true ? <CircularProgress size={20} /> : <PersonIcon />}
            </ToggleButton>
            <ToggleButton
              value={false}
              sx={{ width: "3rem" }}
              title="Zusammen"
            >
              {isLoading == false ? <CircularProgress size={20} /> : <PeopleIcon />}
            </ToggleButton>
          </ToggleButtonGroup>
        )}
    </>
  )
}