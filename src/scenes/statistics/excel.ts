import { utils, writeFile } from "xlsx"
import { RawDiary } from "../../store/statistics/diary"

export const writeRawDiaryToExcel = (diaryEntries: RawDiary[]) => {
    const newColumnHeaders = verifyMapping(diaryEntries[0])
    if (newColumnHeaders.length == 0) {
        return
    }
    console.log(diaryEntries, newColumnHeaders)
    const worksheet = utils.json_to_sheet(diaryEntries)
    utils.sheet_add_aoa(worksheet, [newColumnHeaders], { origin: "A1" })
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, "Rohdaten")

    const today = new Date()
    const filename = "Ernährungstagebuch_" + today.toISOString().slice(0, 10).replace(/-/g, "")
    writeFile(workbook, filename + '.xlsx')
}

const verifyMapping = (diaryEntry: RawDiary): Array<string> => {
    const mapping = {
        date: "Datum",
        hour: "Uhrzeit",
        type: "Typ",
        content: "Was",
        severity: "Zustand",
        category: "Kategorie"
    }
    const newColumns: Array<string> = []
    for (const [key, value] of Object.entries(mapping)) {
        if (key in diaryEntry) {
            newColumns.push(value)
        }
    }
    if (Object.keys(diaryEntry).length != newColumns.length) {
        console.error(`Keys ${Object.keys(diaryEntry)} and new columns ${newColumns} differ.`)
        return []
    }
    return newColumns
}