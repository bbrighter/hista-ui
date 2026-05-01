import { beforeEach, describe, expect, it } from "vitest";

import useHista from "../../store/store";
import { conditionEvents } from "../conditionEvents.actions";
import { conditions as serviceConditions,symptoms as serviceSymptoms } from "../symptoms.actions";

describe("symptoms service", () => {
  beforeEach(async () => {
    await serviceSymptoms.list()
  })

  it("list symptoms", async () => {
    const { symptoms } = useHista.getState()
    expect(symptoms).toHaveLength(2)
    const filledCat = symptoms.find(c => c.categoryId == 1)!
    expect(filledCat).toBeDefined()
    expect(filledCat.symptoms).toHaveLength(2)
    expect(filledCat.symptoms[0].categoryId).toBe(1)

    const emptyCat = symptoms.find(c => c.categoryId == 2)!
    expect(emptyCat).toBeDefined()
    expect(emptyCat.symptoms).toHaveLength(0)
  })

  it("patch symptom name", async () => {
    await serviceSymptoms.patchName(2, "new name symptom2")
    
    const { symptoms } = useHista.getState()
    const cat = symptoms.find(c => c.categoryId == 1)!
    const symptom = cat.symptoms.find(s => s.id == 2)!
    expect(symptom.name).toBe("new name symptom2")
  })

  it("post category", async () => {
    await serviceSymptoms.postCategory("new cat")

    const { symptoms } = useHista.getState()
    expect(symptoms).toHaveLength(3)
    const newCat = symptoms.find(c => c.categoryName === "new cat")!
    expect(newCat).toBeDefined()
    expect(newCat.categoryId).toBe(3)
  })

  it("delete category", async () => {
    await serviceSymptoms.deleteCategory(2)

    const { symptoms } = useHista.getState()
    expect(symptoms).toHaveLength(1)
    expect(symptoms.some(c => c.categoryId === 2)).toBeFalsy()
  })

  it("move symptom to another cat", async () => {
    const symptomId = 1
    const fromCat = 1
    const toCat = 2
    await serviceSymptoms.patchSymptomCategory(symptomId, fromCat, toCat)

    const { symptoms } = useHista.getState()
    expect(symptoms).toHaveLength(2)
    expect(symptoms.map(c => c.symptoms.length)).toStrictEqual([1,1])

    const movedSymptom = symptoms.flatMap(c => c.symptoms).find(s => s.id == symptomId)!
    expect(movedSymptom.categoryId).toBe(toCat)
  })
})

describe("conditions service", () => {
  beforeEach(async () => {
    await conditionEvents.get(1)
    await serviceSymptoms.list()
  })

  it("delete", async () => {
    await serviceConditions.delete(1)

    const { conditionEvent, symptoms } = useHista.getState()
    expect(conditionEvent.conditions.some(c => c.id === 1)).toBeFalsy()
    expect(symptoms).toHaveLength(2)
  })

  it("post by name", async () => {
    await serviceConditions.postByName("symptom2", 1)

    const { conditionEvent, symptoms } = useHista.getState()
    expect(conditionEvent.conditions).toHaveLength(2)
    const condition = conditionEvent.conditions.find(c => c.id == 4)!
    expect(condition).toBeDefined()
    expect(condition.symptomId).toBe(2)
    expect(symptoms).toHaveLength(2)
  })

  it("post by id", async () => {
    await serviceConditions.postById(4)

    const { conditionEvent } = useHista.getState()
    expect(conditionEvent.conditions).toHaveLength(2)
    const condition = conditionEvent.conditions.find(c => c.id == 4)
    expect(condition).toBeDefined()
  })

  it("patch severity", async () => {
    await serviceConditions.patchSeverity(1, 5)

    const { conditionEvent } = useHista.getState()
    const condition = conditionEvent.conditions.find(c => c.id === 1)!
    expect(condition.severity).toBe(5)
  })
})