import { utils, writeFile } from "xlsx"
import { RawDiary } from "../../store/statistics/diary"

export const writeRawDiaryToExcel = (diaryEntries: RawDiary[]) => {
    const numberOfKeys = Object.keys(diaryEntries[0]).length
    const newColumnHeaders = ["Datum", "Uhrzeit", "Typ", "Was", "Zustand"]
    if (numberOfKeys != newColumnHeaders.length) {
        alert(`Mismatch in column headers: ${numberOfKeys} keys and ${newColumnHeaders.length} column headers`)
    }
    const worksheet = utils.json_to_sheet(diaryEntries)
    utils.sheet_add_aoa(worksheet, [newColumnHeaders], { origin: "A1" })
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, "Rohdaten")

    const today = new Date()
    const filename = "Ernährungstagebuch_" + today.toISOString().slice(0, 10).replace(/-/g, "")
    writeFile(workbook, filename + '.xlsx')
}