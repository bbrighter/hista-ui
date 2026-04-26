import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { selectIsLoadingAny } from "../../store"
import useHista from "../../store/store"
import { Loading } from "../components"
import { AddTemplate, TemplateList } from "./components"

export const Templates = () => {
  const isLoading = useHista(selectIsLoadingAny(["templates", "ingredients"]))

  return (
    <Loading show={isLoading}>
      <Container sx={{ padding: "2rem" }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4">Vorlagen</Typography>
          <AddTemplate/>
        </Stack>
        <TemplateList/>
      </Container>
    </Loading>
  )
}