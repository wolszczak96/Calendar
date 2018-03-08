// @flow

import * as A from '~/constants/actionTypes'

const createAction = (type: string, args: Object = {}) => (
  dispatch: Function,
) => {
  const action = { type, ...args }
  dispatch(action)
  return action
}

export const mergeState = (newState: $State) =>
    createAction(A.MERGE_STATE, { newState }),
  setActiveDate = (year: number, month: number, day: number) =>
    createAction(A.SET_ACTIVE_DATE, { year, month, day }),
  addNewTask = (content: string) =>
    createAction(A.ADD_NEW_TASK, { content }),
  deleteTask = (index: number) => createAction(A.DELETE_TASK, { index }),
  updateTask = (update: Object, index: number) =>
    createAction(A.UPDATE_TASK, { update, index }),
  sortTasks = () => createAction(A.SORT_TASKS)
