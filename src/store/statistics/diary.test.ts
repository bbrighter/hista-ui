import { describe, expect, it } from "vitest";
import { statistics } from "../../api/generatedApi";
import { respToRawDiary } from "./diary";

describe("RawDiary", () => {
    it('respToRawDiary', () => {
        const resp: statistics.DiaryResp = {
            diaries: [{
                content: "Content",
                date: "2024-12-05T02:00:00+02:00",
                hour: 12,
                type: "Food",
                severity: "raw",
                category: "Category"
            }]
        }
        const diary = respToRawDiary(resp)
        expect(diary).toHaveLength(1)
        expect(diary[0].content).toBe("Content")
        expect(diary[0].hour).toBe(12)
        expect(diary[0].type).toBe("Essen")
        expect(diary[0].date).toBe("5.12.2024")
        expect(diary[0].severity).toBe("Roh")
        expect(diary[0].category).toBe("Category")
    })
})