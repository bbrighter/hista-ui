import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { AddTemplate, TemplateList } from "./components"

export const Templates = () => {
  return (
    <Container sx={{ padding: "2rem" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Vorlagen</Typography>
        <AddTemplate/>
      </Stack>
      <TemplateList/>
    </Container>
  )
}