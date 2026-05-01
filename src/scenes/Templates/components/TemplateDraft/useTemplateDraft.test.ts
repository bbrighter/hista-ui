import { renderHook } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it } from "vitest";

import useHista from "../../../../store/store";
import { useTemplate, useTemplateDraft } from "./useTemplateDraft";

describe("useTemplate", () => {
  beforeEach(() => {
    const { setTemplates, setIngredients } = useHista.getState()
    setTemplates(
      { 1: { name: "Template", items: [
        { condition: "raw", ingredientId: 1 },
        { condition: "cooked", ingredientId: 2 },
      ] } })
    setIngredients([
      { id: 1, isArchived: false, name: "Name 1" },
      { id: 2, isArchived: false, name: "Name 2" },
      { id: 3, isArchived: false, name: "Name 3" },
    ])
  })

  it("ok", () => {
    const { result } = renderHook(() => useTemplate(1))
    const template = result.current!
    
    expect(template).not.toBeNull()
    expect(template.name).toBe("Template")
    expect(template.items).toHaveLength(2)
    expect(template.items).toContainEqual({ ingredient: { id: 1, name: "Name 1", isArchived: false }, condition: "raw" })
    expect(template.items).toContainEqual({ ingredient: { id: 2, name: "Name 2", isArchived: false }, condition: "cooked" })
  })

  it("wrong id", () => {
    const { result } = renderHook(() => useTemplate(4))
    const template = result.current
    
    expect(template).toBeNull()
  })
})

describe("useTemplateDraft", () => {
  beforeEach(() => {
    const { setTemplates, setIngredients } = useHista.getState()
    setTemplates(
      { 1: { name: "Template", items: [
        { condition: "raw", ingredientId: 1 },
        { condition: "cooked", ingredientId: 2 },
      ] } })
    setIngredients([
      { id: 1, isArchived: false, name: "Name 1" },
      { id: 2, isArchived: false, name: "Name 2" },
      { id: 3, isArchived: false, name: "Name 3" },
    ])
  })

  it("filled", () => {
    const { result } = renderHook(() => useTemplateDraft(1))
    const template = result.current

    expect(template.name).toBe("Template")
    expect(template.draft).toHaveLength(2)
    expect(template.draft).toContainEqual({ ingredient: { id: 1, name: "Name 1", isArchived: false }, condition: "raw" })
    expect(template.draft).toContainEqual({ ingredient: { id: 2, name: "Name 2", isArchived: false }, condition: "cooked" })

    expect(template.canBeSaved()).toBeTruthy()
  })

  it("empty, then edit", () => {
    const { result } = renderHook(() => useTemplateDraft())

    expect(result.current.name).toBe("")
    expect(result.current.draft).toHaveLength(1)
    expect(result.current.draft).toContainEqual({ ingredient: null, condition: "cooked" })

    expect(result.current.canBeSaved()).toBeFalsy()

    act(() => {
      result.current.onChangeName("New name")
    })
    expect(result.current.name).toBe("New name")
    expect(result.current.canBeSaved()).toBeFalsy()
    
    act(() => {
      result.current.onChangeIngredient(0, { id: 1, name: "Name 1", isArchived: false })
    })
    expect(result.current.draft).toHaveLength(1)
    expect(result.current.draft).toContainEqual({ ingredient: { id: 1, name: "Name 1", isArchived: false }, condition: "cooked" })
    expect(result.current.canBeSaved()).toBeTruthy()

    act(() => {
      result.current.onChangeCondition(0)
    })
    expect(result.current.draft).toContainEqual({ ingredient: { id: 1, name: "Name 1", isArchived: false }, condition: "raw" })

    act(() => {
      result.current.onAdd()
    })
    expect(result.current.draft).toHaveLength(2)
    expect(result.current.draft).toContainEqual({ ingredient: null, condition: "cooked" })
  })
})