import moment from 'moment-timezone';

export const getTimezoneDifferenceInMinutesFromLocal = (timezone) => {
  let now = moment();
  const localOffset = now.utcOffset();
  now.tz(timezone);
  const offset = now.utcOffset();
  return offset - localOffset;
};
