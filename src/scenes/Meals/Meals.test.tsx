import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it } from "vitest"

import Meals from "./Meals"

describe("test meals list", () => {
  const findDeleteButton = () => screen.findByTestId("delete-button")
  const findSetNowButton = () => screen.findByTestId("set-now-button")
  
  it("everything is rendered", async () => {
    render(<MemoryRouter><Meals /></MemoryRouter>)

    expect(await screen.findByText("Neue Mahlzeit")).toBeInTheDocument()
    expect(await screen.findByText("01.01.2024 01:00")).toBeInTheDocument()
    expect(await findDeleteButton()).toBeInTheDocument()
    expect(await findSetNowButton()).toBeInTheDocument()
  })

  it("deletion works", async () => {
    render(<MemoryRouter><Meals /></MemoryRouter>)

    const deleteButton = await findDeleteButton()
    await userEvent.click(deleteButton)

    expect(screen.queryByText("01.01.2024 01:00")).not.toBeInTheDocument()
  })

  it("set date to now",async () => {
    render(<MemoryRouter><Meals /></MemoryRouter>)

    const setNowButton = await findSetNowButton()
    await userEvent.click(setNowButton)

    // TODO: Mock date and test result
  })

  it("navigation to managament", async () => {
    render(
      <MemoryRouter initialEntries={["/123/meals"]}>
        <Routes>
          <Route    path="/:piid/meals" element={<Meals/>} />
          <Route    path="/:piid/manage-ingredients" element={<>Management scene</>} />
        </Routes>
      </MemoryRouter>,
    )

    const manageButton = await screen.findByText("Zutaten verwalten", { selector: "button" })
    expect(manageButton).toBeInTheDocument()
    await userEvent.click(manageButton)
    expect(screen.getByText("Management scene")).toBeInTheDocument()
  })
})
