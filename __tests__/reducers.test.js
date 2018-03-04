// @flow

import reducer from '~/reducers'
import * as A from '~/constants/actionTypes'

describe('reducer(state, action)', () => {
  const state = {
    activeDay: 4,
    activeMonth: 2,
    activeYear: 2018,
    tasks: {
      '2018-2': {
        '4': [
          { time: 400, content: 'whtvr' },
          { time: 420, content: 'whtvr1' },
          { time: 20, content: 'whtvr2' },
        ],
      },
    },
  }
  it("doesn't mutate state", () => {
    expect(
      reducer(state, {
        type: A.SET_ACTIVE_DATE,
        year: 2017,
        day: 3,
        month: 11,
      }) === state,
    ).toBe(false)
  })
  it('MERGE_STATE merges state updates with current state', () => {
    expect(
      reducer(state, {
        type: A.MERGE_STATE,
        newState: {
          tasks: {
            '2018-11': {
              '24': [{ time: 1140, content: 'Christmas' }],
            },
          },
        },
      }),
    ).toEqual({
      activeDay: 4,
      activeMonth: 2,
      activeYear: 2018,
      tasks: {
        '2018-2': {
          '4': [
            { time: 400, content: 'whtvr' },
            { time: 420, content: 'whtvr1' },
            { time: 20, content: 'whtvr2' },
          ],
        },
        '2018-11': {
          '24': [{ time: 1140, content: 'Christmas' }],
        },
      },
    })
  })
  it('SET_ACTIVE_DATE returns state with new active date', () => {
    expect(
      reducer(state, {
        type: A.SET_ACTIVE_DATE,
        year: 2017,
        day: 3,
        month: 11,
      }),
    ).toEqual({
      activeDay: 3,
      activeMonth: 11,
      activeYear: 2017,
      tasks: {
        '2018-2': {
          '4': [
            { time: 400, content: 'whtvr' },
            { time: 420, content: 'whtvr1' },
            { time: 20, content: 'whtvr2' },
          ],
        },
      },
    })
  })
  it("ADD_NEW_TASK returns state with new task appended to active day's tasks", () => {
    expect(
      reducer(state, {
        type: A.ADD_NEW_TASK,
        content: 'calendar app',
      }),
    ).toEqual({
      activeDay: 4,
      activeMonth: 2,
      activeYear: 2018,
      tasks: {
        '2018-2': {
          '4': [
            { time: 400, content: 'whtvr' },
            { time: 420, content: 'whtvr1' },
            { time: 20, content: 'whtvr2' },
            { time: 420, content: 'calendar app' },
          ],
        },
      },
    })
  })
  it("UPDATE_TASK returns state with updated task at specified index in active day's tasks", () => {
    expect(
      reducer(state, {
        type: A.UPDATE_TASK,
        update: { content: 'calendar app done' },
        index: 1,
      }),
    ).toEqual({
      activeDay: 4,
      activeMonth: 2,
      activeYear: 2018,
      tasks: {
        '2018-2': {
          '4': [
            { time: 400, content: 'whtvr' },
            { time: 420, content: 'calendar app done' },
            { time: 20, content: 'whtvr2' },
          ],
        },
      },
    })
  })
  it("DELETE_TASK returns state with deleted task from specified index in active day's tasks", () => {
    expect(
      reducer(state, {
        type: A.DELETE_TASK,
        index: 0,
      }),
    ).toEqual({
      activeDay: 4,
      activeMonth: 2,
      activeYear: 2018,
      tasks: {
        '2018-2': {
          '4': [
            { time: 420, content: 'whtvr1' },
            { time: 20, content: 'whtvr2' },
          ],
        },
      },
    })
  })
  it("SORT_TASKS returns state with active day's tasks sorted", () => {
    expect(
      reducer(state, {
        type: A.SORT_TASKS,
        index: 0,
      }),
    ).toEqual({
      activeDay: 4,
      activeMonth: 2,
      activeYear: 2018,
      tasks: {
        '2018-2': {
          '4': [
            { time: 20, content: 'whtvr2' },
            { time: 400, content: 'whtvr' },
            { time: 420, content: 'whtvr1' },
          ],
        },
      },
    })
  })
})
