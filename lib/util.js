// @flow

import u from 'updeep'
import { getTasks, getFullActiveDate } from '~/getters'

export const appendTask = (content: string) => (tasks: $Task[]): $Task[] => {
    let time = 420
    const lastTime = tasks.length > 0 && tasks[tasks.length - 1].time
    if (lastTime && lastTime >= time) {
      time = lastTime - lastTime % 60 + 60
      time = time >= 1440 ? 1439 : time
    }
    return [...tasks, { time, content }]
  },
  deleteTask = (index: number) => (tasks: $Task[]): $Task[] =>
    tasks.filter((t, i) => i !== index),
  updateTask = (update: Object, index: number) => (tasks: $Task[]) =>
    tasks.map((t, i) => (i === index ? u(update, t) : t)),
  sortTasks = () => (tasks: $Task[]) =>
    [...tasks].sort((a, b) => a.time - b.time),
  taskUpdObject = (state: $State, updFn: Function) => {
    const fullDate = getFullActiveDate(state)
    const { year, month, day } = fullDate
    const tasks = getTasks(state, fullDate)
    return {
      tasks: {
        [`${year}-${month}`]: {
          [day.toString()]: updFn(tasks),
        },
      },
    }
  },
  minutesToTimeString = (minutes: number) => {
    const hrs = Math.floor(minutes / 60),
      mins = minutes % 60
    return `${hrs < 10 ? 0 : ''}${hrs}:${mins < 10 ? 0 : ''}${mins}`
  },
  timeStringToMinutes = (time: string) => {
    const mh = time.split(':')
    return parseInt(mh[0], 10) * 60 + parseInt(mh[1], 10)
  },
  saveLocal = (state: $State) => {
    if (process.browser)
      localStorage.setItem('calendarAppTasks', JSON.stringify(state.tasks))
    return state
  }
