// @flow

import { dayName, weekDay } from '~/lib/dateUtils'

export const getStateFromLocalStorage = () => {
    const savedTasks = localStorage.getItem('calendarAppTasks')
    return savedTasks && { tasks: JSON.parse(savedTasks) }
  },
  getActiveDay = (state: $State) =>
    typeof state.activeDay === 'number' ? state.activeDay : getCurrentDay(),
  getActiveMonth = (state: $State) =>
    typeof state.activeMonth === 'number'
      ? state.activeMonth
      : getCurrentMonth(),
  getActiveYear = (state: $State) =>
    typeof state.activeYear === 'number' ? state.activeYear : getCurrentYear(),
  getFullActiveDate = (state: $State) => ({
    year: getActiveYear(state),
    month: getActiveMonth(state),
    day: getActiveDay(state),
  }),
  getCurrentDay = () => new Date().getDate(),
  getCurrentMonth = () => new Date().getMonth(),
  getCurrentYear = () => new Date().getFullYear(),
  getActiveDayName = (state: $State): string =>
    dayName(
      weekDay(getActiveYear(state), getActiveMonth(state), getActiveDay(state)),
    ),
  getDefaultState = (): $State => ({
    activeYear: getCurrentYear(),
    activeMonth: getCurrentMonth(),
    activeDay: getCurrentDay(),
    tasks: {},
  }),
  getTasks = (
    state: $State,
    fullDate: Object = getFullActiveDate(state),
  ): $Task[] => {
    const { year, month, day } = fullDate
    if (!state.tasks) return []
    const monthTasks = state.tasks[`${year}-${month}`]
    if (!monthTasks) return []
    return monthTasks[day.toString()] || []
  },
  hasTasks = (state: $State, fullDate: Object) =>
    getTasks(state, fullDate).length > 0
