import { utils, writeFile } from 'xlsx'
import { RawDiary } from '../../store/statistics/diary'

export const writeRawDiaryToExcel = (diaryEntries: RawDiary[]) => {
    const worksheet = utils.json_to_sheet(diaryEntries)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Rohdaten')

    const today = new Date()
    const filename = 'Ernährungstagebuch_' + today.toISOString().slice(0, 10).replace(/-/g, '')
    writeFile(workbook, filename + '.xlsx')
}