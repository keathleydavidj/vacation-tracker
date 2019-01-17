import moment from 'moment';

const utcOffset = moment().utcOffset();

export const addOffset = date => moment(date).add(utcOffset, 'minutes').toDate();
export const removeOffset = date => moment(date).subtract(utcOffset, 'minutes').toDate();
