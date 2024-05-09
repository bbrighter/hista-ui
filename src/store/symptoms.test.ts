import { describe, expect, it } from "vitest";
import { symptoms } from "../api/generatedApi";
import { respToSymptoms } from "./symptom";

describe("symptom", () => {
    const resp: symptoms.SymptomCategoriesResponse = {
        Categories: [
            { id: 1, name: "Cat", symptoms: [] }
        ]
    }
    it('test', () => {
        const cats = respToSymptoms(resp)
        expect(cats).toHaveLength(1)
    })
})