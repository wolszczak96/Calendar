// @flow

import {
  monthLength,
  monthName,
  weekDay,
  dayName,
  calendarCardDays,
} from '~/lib/dateUtils'

describe('monthLength(year, month)', () => {
  it(`returns number of days in specified month`, () => {
    expect(monthLength(2018, 0)).toBe(31)
    expect(monthLength(2018, 1)).toBe(28)
    expect(monthLength(4, 1)).toBe(29)
    expect(monthLength(2016, 1)).toBe(29)
    expect(monthLength(2018, 2)).toBe(31)
    expect(monthLength(2018, 3)).toBe(30)
    expect(monthLength(2018, 4)).toBe(31)
    expect(monthLength(2018, 5)).toBe(30)
    expect(monthLength(2018, 6)).toBe(31)
    expect(monthLength(2018, 7)).toBe(31)
    expect(monthLength(2018, 8)).toBe(30)
    expect(monthLength(2018, 9)).toBe(31)
    expect(monthLength(2018, 10)).toBe(30)
    expect(monthLength(2018, 11)).toBe(31)
  })
})

describe('monthName(month)', () => {
  it('returns name of specified month', () => {
    expect(monthName(1)).toBe('February')
  })
  it('works for -1 and 12 indexes', () => {
    expect(monthName(-1)).toBe('December')
    expect(monthName(12)).toBe('January')
  })
})

describe('dayName(index)', () => {
  it('returns name of specified weekday', () => {
    expect(dayName(6)).toBe('Sunday')
    expect(dayName(1)).toBe('Tuesday')
    expect(dayName(2)).toBe('Wednesday')
  })
})

describe('weekDay(year, month, day)', () => {
  it('returns weekday index of specified day (monday - 0, sunday - 6)', () => {
    expect(weekDay(2018, 2, 4)).toBe(6)
  })
})

describe('calendarCardDays(year, month)', () => {
  it('returns {prev, curr, next} objects describing days to render for current month and previous/next months', () => {
    expect(calendarCardDays(2018, 2)).toEqual({
      prev: { from: 26, amount: 3 },
      curr: { from: 1, amount: 31 },
      next: { from: 1, amount: 1 },
    })
    expect(calendarCardDays(2016, 1)).toEqual({
      prev: { from: 0, amount: 0 },
      curr: { from: 1, amount: 29 },
      next: { from: 1, amount: 6 },
    })
  })
})
