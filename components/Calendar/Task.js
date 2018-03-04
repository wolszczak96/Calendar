// @flow

import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import * as ACT from '~/actions'
import { minutesToTimeString, timeStringToMinutes } from '~/lib/util'
import TimeInput from './TimeInput'

const Task = ({
  task,
  index,
  updateTask,
  deleteTask,
  sortTasks,
}: $TaskPropsWithActions) => (
  <div className="single-task">
    <div className="inputs">
      <TimeInput
        value={minutesToTimeString(task.time)}
        onChange={e =>
          updateTask({ time: timeStringToMinutes(e.target.value) }, index)
        }
        onBlur={sortTasks}
      />
      <input
        type="text"
        placeholder="EVENT TITLE"
        value={task.content}
        onChange={e => updateTask({ content: e.target.value.trim() }, index)}
      />
    </div>
    <div className="del-cont">
      <button onClick={() => deleteTask(index)}>X</button>
    </div>
    <style jsx>{`
      .single-task {
        display: flex;
        width: 100%;
        height: 50px;
        & .inputs {
          flex: 1;
          display: flex;
          & input {
            font-size: 16px;
            cursor: text;
            flex: 1;
            background: none;
            border: none;
            outline: none;
          }
        }
        & .del-cont {
          width: 50px;
          & button {
            padding: 0;
            width: 50px;
            height: 50px;
            font-size: 14px;
            background: none;
            border: none;
            outline: none;
            cursor: pointer;
            text-align: center;
          }
        }
      }
    `}</style>
  </div>
)

const mapDispatchToProps = R.pick(
  ['updateTask', 'deleteTask', 'sortTasks'],
  ACT,
)

export default connect(null, mapDispatchToProps)(Task)
