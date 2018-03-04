// @flow

import {
  getFullActiveDate,
  getActiveDayName,
  getTasks,
  hasTasks,
} from '~/getters'

describe('getFullActiveDate(state)', () => {
  it(`returns {year, month, day} object describing active date`, () => {
    expect(
      getFullActiveDate({
        tasks: {},
        activeYear: 2018,
        activeDay: 4,
        activeMonth: 2,
      }),
    ).toEqual({ year: 2018, day: 4, month: 2 })
  })
})

describe('getActieDayName(state)', () => {
  it(`returns active day name`, () => {
    expect(
      getActiveDayName({
        tasks: {},
        activeYear: 2018,
        activeDay: 4,
        activeMonth: 2,
      }),
    ).toBe('Sunday')
  })
})

describe('getTasks(state)', () => {
  it(`returns tasks to display for active date`, () => {
    const tasks = [{ content: 'a', time: 1 }, { content: 'b', time: 2 }]
    expect(
      getTasks({
        tasks: {
          '2018-2': {
            '4': tasks,
          },
        },
        activeYear: 2018,
        activeDay: 4,
        activeMonth: 2,
      }),
    ).toBe(tasks)
  })
})

describe('hasTasks(state, fullDate)', () => {
  it(`checks if specified date has some tasks`, () => {
    const tasks = [{ content: 'a', time: 1 }, { content: 'b', time: 2 }]
    expect(
      hasTasks(
        {
          tasks: {
            '2018-2': {
              '4': tasks,
            },
          },
          activeYear: 2018,
          activeDay: 4,
          activeMonth: 2,
        },
        { year: 2018, day: 4, month: 2 },
      ),
    ).toBe(true)
    expect(
      hasTasks(
        {
          tasks: {
            '2018-2': {
              '4': tasks,
            },
          },
          activeYear: 2018,
          activeDay: 4,
          activeMonth: 2,
        },
        { year: 2018, day: 8, month: 2 },
      ),
    ).toBe(false)
  })
})
