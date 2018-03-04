// @flow

import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  getCurrentYear,
  getCurrentMonth,
  getCurrentDay,
  getActiveDay,
  getActiveMonth,
  hasTasks,
} from '~/getters'
import * as ACT from '~/actions'

const DayTile = ({
  year,
  month,
  day,
  hasSomeTasks,
  setActiveDate,
  isActive,
  isAdditional,
  isToday,
}: $DayTilePropsWithActions) => (
  <div className={`day-tile${isAdditional ? ' additional' : ''}`}>
    <button
      className={`day-button${isActive ? ' active' : ''}${
        isToday ? ' today' : ''
      }${hasSomeTasks ? ' has-tasks' : ''}`}
      onClick={!isActive ? () => setActiveDate(year, month, day) : undefined}
    >
      {day}
    </button>
    <style jsx>{`
      .day-tile {
        flex: 0 0 calc(100% / 7);
        position: relative;
        &.additional {
          opacity: 0.6;
        }
      }
      .day-button {
        background: none;
        border: none;
        outline: none;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        cursor: pointer;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &.active {
          cursor: default;
          background-color: black;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
        }
        &.today:not(.active) {
          border: 2px solid black;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
        }
        &.has-tasks::after {
          content: '';
          display: block;
          position: absolute;
          top: 5px;
          right: 5px;
          border: 5px solid #42f4a4;
          border-radius: 5px;
        }
      }
    `}</style>
  </div>
)

const mapStateToProps = (
    state: $State,
    ownProps: $DayTileProps,
  ): $DayTilePropsWithState => {
    const { year, month, day } = ownProps
    const isAdditional = ownProps.month !== getActiveMonth(state)
    return {
      hasSomeTasks: hasTasks(state, ownProps),
      isAdditional,
      isActive: !isAdditional && ownProps.day === getActiveDay(state),
      isToday:
        day === getCurrentDay() &&
        month === getCurrentMonth() &&
        year === getCurrentYear(),
      ...ownProps,
    }
  },
  mapDispatchToProps = R.pick(['setActiveDate'], ACT)

export default connect(mapStateToProps, mapDispatchToProps)(DayTile)
