import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

/**
 * Retrieves and formats the time given a date
 *
 * @param date date to fetch time from
 * @returns string representing the time e.g. "8:30 AM"
 */
export const getTimeFromDate = (date: Date) => {
  return dayjs(date).format('h:mm A')
}

/**
 * Retrieves the relative time given a date
 *
 * @param date date to get relative time from
 * @returns string representing the relative time e.g. "2 hours ago"
 */
export const getRelativeTimeFromDate = (date: Date) => {
  return dayjs(date).fromNow()
}
