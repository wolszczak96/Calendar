// @flow

import React from 'react'
import Calendar from './Calendar'
import Tasks from './Tasks'

export default () => (
  <div className="calendar-container">
    <Calendar />
    <Tasks />
    <style jsx>{`
      @media only screen and (min-width: 700px) {
        .calendar-container {
          display: flex;
        }
      }
    `}</style>
  </div>
)
