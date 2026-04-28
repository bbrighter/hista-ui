import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { selectIsLoadingAny, services, useHeadaches } from "../../store"
import useHista from "../../store/store"
import { Loading, OverviewList } from "../components"
import { Icons } from "../components/Icons"
import { getColor } from "../Headache/components/colorMapping"

export default function Headaches() {
  const isLoading = useHista(selectIsLoadingAny(["headaches"]))
  const navigate = useNavigate()
  const [postLoading, setPostLoading] = useState(false)
  const headaches = useHeadaches()

  const onCreate = async () => {
    setPostLoading(true)
    const id = await services.headaches.post()
    setPostLoading(false)
    if (id) {
      navigate(`${id}`)
    }
  }

  const onClick = (id: number) => {
    navigate(`${id}`)
  }

  return (
    <Loading show={isLoading}>
      <Container sx={{ padding: "2rem" }}>
        <Button
          startIcon={<Icons.headaches />}
          variant="contained"
          onClick={onCreate}
          loading={postLoading}
        >
          Neuer Kopfschmerz
        </Button>
        <OverviewList
          getData={services.headaches.list}
          items={headaches}
          onClick={onClick}
          onDelete={services.headaches.delete}
          showSeverity
          severityColorMapping={getColor}
        />
      </Container>
    </Loading>

  )
}
