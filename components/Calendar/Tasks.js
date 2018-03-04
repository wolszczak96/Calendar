// @flow

import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import * as ACT from '~/actions'
import { getActiveDay, getTasks, getActiveDayName } from '~/getters'
import Task from './Task'

let formInputRef

const Tasks = ({
  activeDay,
  dayName,
  tasks,
  addNewTask,
}: $TasksPropsWithActions) => (
  <div className="tasks-component">
    <div className="header title">{`${dayName} ${activeDay}`}</div>
    <div className="tasks-container">
      {tasks.map((t: $Task, i: number) => (
        <Task key={`${i}-${t.time}`} task={t} index={i} />
      ))}
    </div>
    <form
      onSubmit={e => {
        e.preventDefault()
        if (formInputRef && formInputRef.value.length) {
          addNewTask(formInputRef.value)
          formInputRef.value = ''
        }
      }}
      className="task-adder"
    >
      <input
        ref={me => {
          formInputRef = me
        }}
        className="task-content"
        type="text"
        placeholder="ADD AN EVENT"
      />
      <input className="add-button" type="submit" value="+" />
    </form>
    <style jsx>{`
      .tasks-component {
        background-color: #222;
        flex: 0 0 300px;
        height: 540px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
      @media only screen and (min-width: 700px) {
        .tasks-component {
          max-width: 300px;
        }
      }
      .header {
        width: 100%;
        height: 60px;
        padding: 20px;
        background-color: #111;
      }
      .tasks-container {
        flex: 1;
        height: 430px;
        padding: 10px;
        overflow: scroll;
      }
      .task-adder {
        background-color: #111;
        height: 50px;
        display: flex;
        align-items: stretch;
        & .task-content {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          padding: 20px;
          font-size: 16px;
          cursor: text;
        }
        & .add-button {
          flex: 0 0 50px;
          font-size: 30px;
          background: none;
          border: none;
          outline: none;
          cursor: pointer;
        }
      }
    `}</style>
  </div>
)
const mapStateToProps = (state: $State) => ({
    activeDay: getActiveDay(state),
    tasks: getTasks(state),
    dayName: getActiveDayName(state),
  }),
  mapDispatchToProps = R.pick(['addNewTask'], ACT)

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
