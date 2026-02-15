import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import { IngredientManagement } from "./IngredientManagement"

const getIngredientRow = (ingredient: string): HTMLElement => {
  const ing = screen.getByText(ingredient)
  return ing.closest("li")
}

const getArchiveButton = (ingredient: string): HTMLElement => {
  return within(getIngredientRow(ingredient)).getByTestId("archiveButton")
}

const getEditButton = (ingredient: string): HTMLElement => {
  return within(getIngredientRow(ingredient)).getByTestId("editButton")
}

describe("IngredientManagement", () => {
  it("Everthing renders", async () => {
    render(<MemoryRouter><IngredientManagement /></MemoryRouter>)

    const row1 = await waitFor(() => getIngredientRow("ingredient1"))
    expect(row1).toBeInTheDocument()

    const archiveButton = getArchiveButton("ingredient1")
    expect(archiveButton).toBeInTheDocument()

    const editButton = getEditButton("ingredient1")
    expect(editButton).toBeInTheDocument()
  })

  it("Archiving", async () => {
    render(<MemoryRouter><IngredientManagement /></MemoryRouter>)

    const archiveButton = await waitFor(() => getArchiveButton("ingredient1"))
    expect(archiveButton).toBeInTheDocument()
    expect(within(archiveButton).getByTestId("ArchiveIcon")).toBeInTheDocument()

    await userEvent.click(archiveButton)
    expect(within(archiveButton).getByTestId("UnarchiveIcon")).toBeInTheDocument()
  })

  it("Rename", async () => {
    render(<MemoryRouter><IngredientManagement /></MemoryRouter>)

    const editButton = await waitFor(() => getEditButton("ingredient1"))
    expect(editButton).toBeInTheDocument()

    await userEvent.click(editButton)
    expect(screen.getByLabelText("Zutat")).toBeInTheDocument()
    const cancelButton = screen.getByTitle("Umbenennen abbrechen")
    expect(cancelButton).toBeInTheDocument()
    await userEvent.click(cancelButton)

    await userEvent.click(editButton)
    const textField = screen.getByLabelText("Zutat")
    expect(textField).toBeInTheDocument()
    await userEvent.type(textField, " new")
    const saveButton = screen.getByTitle("Umbenennen speichern")
    expect(saveButton).toBeInTheDocument()
    await userEvent.click(saveButton)

    expect(screen.queryByLabelText("Zutat")).not.toBeInTheDocument()
    expect(screen.getByText("ingredient1 new")).toBeInTheDocument()

    await userEvent.click(editButton)
    const newTextField = screen.getByLabelText("Zutat")
    await userEvent.clear(newTextField)
    await userEvent.type(newTextField, "ingredient2")
    expect(saveButton).toBeDisabled()
  })
})
