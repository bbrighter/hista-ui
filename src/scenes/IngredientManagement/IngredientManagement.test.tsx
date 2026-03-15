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

const getNutritionButton = (ingredient: string): HTMLElement => {
  return within(getIngredientRow(ingredient)).getByTestId("editNutritionButton")
}

describe("IngredientManagement", () => {
  it("Everthing renders", async () => {
    render(<MemoryRouter><IngredientManagement /></MemoryRouter>)

    const row1 = await waitFor(() => getIngredientRow("ingredient1"))
    expect(row1).toBeInTheDocument()
    expect(row1).toHaveTextContent("F: 5 | K: 20 | B: 0 | E: 3")

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
  })

  it("Renaming only works for different and non-empty names", async () => {
    render(<MemoryRouter><IngredientManagement /></MemoryRouter>)

    const editButton = await waitFor(() => getEditButton("ingredient1"))
    expect(editButton).toBeInTheDocument()

    await userEvent.click(editButton)
    const textField = screen.getByLabelText("Zutat")
    await userEvent.clear(textField)
    expect(screen.getByTitle("Umbenennen speichern")).toBeDisabled()
    await userEvent.type(textField, "ingredient2")
    expect(screen.getByTitle("Umbenennen speichern")).toBeDisabled()
  })

  it("Manage nutrition", async () => {
    render(<MemoryRouter><IngredientManagement /></MemoryRouter>)

    const nutritionButton = await waitFor(() => getNutritionButton("ingredient1"))
    expect(screen.getByText("F: 5 | K: 20 | B: 0 | E: 3")).toBeInTheDocument()
    expect(nutritionButton).toBeInTheDocument()

    await userEvent.click(nutritionButton)
    const modal = screen.getByRole("dialog")
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent("Nährwerte pro 100 g")
    const saveButton = within(modal).getByRole("button", { name: "Speichern" })
    expect(saveButton).not.toBeDisabled()
    const cancelButton = within(modal).getByRole("button", { name: "Abbrechen" })
    expect(cancelButton).toBeInTheDocument()

    await userEvent.click(cancelButton)
    expect(modal).not.toBeVisible()

    await userEvent.click(nutritionButton)
    const fatInput = within(modal).getByLabelText("Fett")
    expect(fatInput).toBeInTheDocument()
    await userEvent.clear(fatInput)
    expect(saveButton).toBeDisabled()
    await userEvent.type(fatInput, "33")
    await userEvent.click(saveButton)
    expect(modal).not.toBeVisible()
    expect(screen.getByText(/F: 33/)).toBeInTheDocument()
  })
})
