// @flow

import { dayNames, monthNames } from '~/constants'

export const monthLength = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate(),
  monthName = (month: number) => monthNames[(month + 12) % 12],
  weekDay = (year: number, month: number, day: number) =>
    (new Date(year, month, day).getDay() + 6) % 7,
  dayName = (i: number) => dayNames[i],
  calendarCardDays = (year: number, month: number) => {
    const startIndex = weekDay(year, month, 1)
    const showPrev = startIndex > 0
    const days = {}
    days.prev = {
      from: showPrev ? monthLength(year, month - 1) - startIndex + 1 : 0,
      amount: showPrev ? startIndex : 0,
    }
    days.curr = {
      from: 1,
      amount: monthLength(year, month),
    }
    const length = days.prev.amount + days.curr.amount
    const rest = length % 7
    days.next = {
      from: 1,
      amount: rest > 0 ? 7 - rest : 0,
    }
    return days
  }
