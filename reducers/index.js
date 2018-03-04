// @flow

import u from 'updeep'
import * as A from '~/constants/actionTypes'
import { getDefaultState } from '~/getters'
import {
  taskUpdObject,
  appendTask,
  updateTask,
  deleteTask,
  sortTasks,
  saveLocal,
} from '~/lib/util'

const reducer = (state: $State = getDefaultState(), action: Object) => {
  switch (action.type) {
    case A.MERGE_STATE:
      return u(action.newState, state)
    case A.SET_ACTIVE_DATE:
      const { year, month, day } = action
      const date = new Date(year, month, day)
      return u(
        {
          activeYear: date.getFullYear(),
          activeMonth: date.getMonth(),
          activeDay: date.getDate(),
        },
        state,
      )
    case A.ADD_NEW_TASK:
      return saveLocal(
        u(taskUpdObject(state, appendTask(action.content)), state),
      )
    case A.UPDATE_TASK:
      return saveLocal(
        u(taskUpdObject(state, updateTask(action.update, action.index)), state),
      )
    case A.DELETE_TASK:
      return saveLocal(u(taskUpdObject(state, deleteTask(action.index)), state))
    case A.SORT_TASKS:
      return saveLocal(u(taskUpdObject(state, sortTasks()), state))
    default:
      return state
  }
}

export default reducer
