import dayjs from 'dayjs'

export const DATE_FORMATS = {
    default: 'DD.MM.YYYY',
    withTime: 'DD.MM.YYYY HH:mm',
}

export const formatDate = (date: Date | dayjs.Dayjs, format: keyof typeof DATE_FORMATS = 'default'): string => {
    const dayjsDate = date instanceof Date ? dayjs(date) : date
    return dayjsDate.format(DATE_FORMATS[format])
}
