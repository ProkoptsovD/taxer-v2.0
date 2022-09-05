import moment from 'moment';

export const normalizeDateTime = (date: Date, format: string = 'YYYY-MM-DD'): string => moment(date).format(format);