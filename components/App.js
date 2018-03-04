// @flow

import React from 'react'
import Calendar from './Calendar'

const App = () => (
  <div className="app-container">
    <Calendar />
    <style jsx>{`
      .app-container {
        margin: auto;
        max-width: 992px;
      }
      :global(body) {
        margin: 0;
      }
      :global(button:not(:hover)) {
        opacity: 0.9;
      }
      :global(*) {
        font-family: system-ui;
        color: white;
        cursor: default;
        box-sizing: border-box;
      }
      :global(h1) {
        font-size: 24px;
        font-weight: normal;
        margin: 0;
      }
      :global(.title) {
        text-transform: uppercase;
      }
    `}</style>
  </div>
)

export default App
