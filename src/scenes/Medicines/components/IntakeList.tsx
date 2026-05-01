import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";

import { useOldIntakes, useTodaysIntakes } from "./intakeHooks";
import { IntakeListItem } from "./IntakeListItem";

export const IntakeList = () => {
  const todaysIntakes = useTodaysIntakes()
  const oldIntakes = useOldIntakes()

  const formatDate = (d: Date): string => {
    return d.toLocaleDateString("de-DE", { weekday: "long", month: "2-digit", day: "2-digit", year: "numeric" })
  }

  return (
    <Box sx={{ pt: 2 }}>
      <List>
        <ListSubheader>{formatDate(new Date())}</ListSubheader>
        {todaysIntakes.map(i => (
          <IntakeListItem 
            key={i.medicineId} 
            id={i.medicineId} 
            name={i.name} 
            count={i.count}
          />
        ))}
        {oldIntakes.map(o => (
          <List key={o.date.toISOString()} >
            <Divider/>
            <ListSubheader>{formatDate(o.date)}</ListSubheader>
            {o.values.map(i => (
              <IntakeListItem 
                key={i.medicineId}
                id={i.medicineId} 
                name={i.name} 
                count={i.count} 
                isOld={true}
                isArchived={i.archived}
              />
            ))}
          </List>
        ))}
      </List>
    </Box>
  )
};
