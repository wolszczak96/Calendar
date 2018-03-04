// @flow

import {
  appendTask,
  deleteTask,
  updateTask,
  sortTasks,
  taskUpdObject,
  timeStringToMinutes,
  minutesToTimeString,
} from '~/lib/util'

describe('appendTask(content)(tasks)', () => {
  it(`appends new task with specified content to an array of tasks`, () => {
    expect(appendTask('new task')([{ time: 400, content: 'whtvr' }])).toEqual([
      { time: 400, content: 'whtvr' },
      { time: 420, content: 'new task' },
    ])
  })
  it(`calculates next full hour to append task at the ond of array`, () => {
    expect(appendTask('new task')([{ time: 800, content: 'whtvr' }])).toEqual([
      { time: 800, content: 'whtvr' },
      { time: 840, content: 'new task' },
    ])
  })
})

describe('deleteTask(index)(tasks)', () => {
  it(`deletes task under specified index`, () => {
    expect(
      deleteTask(1)([
        { time: 400, content: 'whtvr' },
        { time: 460, content: 'whtvr1' },
        { time: 520, content: 'whtvr2' },
      ]),
    ).toEqual([
      { time: 400, content: 'whtvr' },
      { time: 520, content: 'whtvr2' },
    ])
  })
})

describe('updateTask(update, index)(tasks)', () => {
  it(`updates task under specified index`, () => {
    expect(
      updateTask({ time: 100 }, 1)([
        { time: 400, content: 'whtvr' },
        { time: 460, content: 'whtvr1' },
      ]),
    ).toEqual([
      { time: 400, content: 'whtvr' },
      { time: 100, content: 'whtvr1' },
    ])
  })
})

describe('sortTasks()(tasks)', () => {
  it(`sorts task by time, ascending`, () => {
    expect(
      sortTasks()([
        { time: 400, content: 'whtvr' },
        { time: 460, content: 'whtvr1' },
        { time: 20, content: 'whtvr2' },
      ]),
    ).toEqual([
      { time: 20, content: 'whtvr2' },
      { time: 400, content: 'whtvr' },
      { time: 460, content: 'whtvr1' },
    ])
  })
})

describe('taskUpdObject(state, updFn)', () => {
  it(`creates object for updating tasks`, () => {
    expect(
      taskUpdObject(
        {
          activeDay: 4,
          activeMonth: 2,
          activeYear: 2018,
          tasks: {
            '2018-2': {
              '4': [
                { time: 400, content: 'whtvr' },
                { time: 420, content: 'whtvr1' },
              ],
            },
          },
        },
        updateTask({ time: 100 }, 1),
      ),
    ).toEqual({
      tasks: {
        '2018-2': {
          '4': [
            { time: 400, content: 'whtvr' },
            { time: 100, content: 'whtvr1' },
          ],
        },
      },
    })
  })
})

describe('timeStringToMinutes(time)', () => {
  it('converts time string in format HH:MM(24h) to number of minutes from 00:00', () => {
    expect(timeStringToMinutes('07:00')).toBe(420)
  })
})

describe('minutesToTimeString(time)', () => {
  it('converts number of minutes from 00:00 to time string in format HH:MM(24h)', () => {
    expect(minutesToTimeString(420)).toBe('07:00')
  })
})
