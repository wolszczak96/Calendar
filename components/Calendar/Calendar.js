// @flow

import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import * as ACT from '~/actions'
import { dayNames } from '~/constants'
import { calendarCardDays, monthName } from '~/lib/dateUtils'
import { getActiveYear, getActiveMonth } from '~/getters'
import DayTile from './DayTile'

const Calendar = ({
  activeYear,
  activeMonth,
  daysToShow,
  setActiveDate,
}: $CalendarComponentPropsWithActions) => (
  <div className="calendar-comp">
    <div className="calendar-header title">
      <div className="date-display">
        <h1 className="month-display">{monthName(activeMonth)}</h1>
        <div className="year-display">{activeYear}</div>
      </div>
      <div className="switch">
        <button onClick={() => setActiveDate(activeYear, activeMonth - 1, 1)}>
          {'<'}
        </button>
        <button onClick={() => setActiveDate(activeYear, activeMonth + 1, 1)}>
          {'>'}
        </button>
      </div>
    </div>
    <div className="days-display">
      {dayNames.map(d => (
        <div key={d} className="day title">
          {d.substr(0, 3)}
        </div>
      ))}
    </div>
    <div className="calendar-card">
      {Object.keys(daysToShow).reduce(
        (tiles: Array<any>, k: any, i: number) => {
          const days = daysToShow[k]
          for (let j = 0; j < days.amount; j += 1) {
            tiles.push(
              <DayTile
                key={k + j}
                year={activeYear - (i === 0 && activeMonth === 0 ? 1 : 0)}
                month={(activeMonth + i - 1) % 12}
                day={days.from + j}
              />,
            )
          }
          return tiles
        },
        [],
      )}
    </div>
    <style jsx>{`
      .calendar-comp {
        flex: 1;
        padding: 15px;
        background: linear-gradient(#ff6666, red);
        max-height: 540px;
      }
      .calendar-header {
        display: flex;
        height: 80px;
        padding: 10px;
        & .date-display {
          flex: 1;
        }
        & .switch {
          text-align: right;
          & button {
            background: none;
            border: none;
            outline: none;
            font-size: 30px;
            line-height: 30px;
            font-weight: 100;
            margin: 0 5px;
            cursor: pointer;
          }
        }
      }
      .days-display {
        display: flex;
        align-items: stretch;
        font-size: 14px;
        padding-bottom: 10px;
        height: 30px;
        & .day {
          color: black;
          opacity: 0.5;
          text-align: center;
          flex: 1;
        }
      }
      .calendar-card {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        align-content: stretch;
        height: 400px;
      }
    `}</style>
  </div>
)

const mapStateToProps = (state: $State): $CalendarComponentPropsWithState => {
    const activeYear = getActiveYear(state),
      activeMonth = getActiveMonth(state),
      daysToShow = calendarCardDays(activeYear, activeMonth)
    return { activeYear, activeMonth, daysToShow }
  },
  mapDispatchToProps = R.pick(['setActiveDate'], ACT)

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
