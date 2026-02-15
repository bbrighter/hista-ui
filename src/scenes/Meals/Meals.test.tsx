import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import Meals from "./Meals"

describe("test meals list", () => {
  const findDeleteButton = () => screen.findByTitle("Löschen")

  it("everything is rendered", async () => {
    render(<MemoryRouter><Meals /></MemoryRouter>)

    expect(await screen.findByText("Neue Mahlzeit")).toBeInTheDocument()
    expect(await screen.findByText("01.01.2024 01:00")).toBeInTheDocument()
    expect(await findDeleteButton()).toBeInTheDocument()
  })

  it("deletion works", async () => {
    render(<MemoryRouter><Meals /></MemoryRouter>)

    const deleteButton = await findDeleteButton()
    await userEvent.click(deleteButton)

    expect(screen.queryByText("01.01.2024 01:00")).not.toBeInTheDocument()
  })
})
