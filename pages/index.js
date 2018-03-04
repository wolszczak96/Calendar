// @flow

import React from 'react'
import withRedux from 'next-redux-wrapper'
import createStore from '~/createStore'
import { mergeState } from '~/actions'
import App from '~/components/App'
import { getStateFromLocalStorage } from '~/getters'

class Index extends React.Component<Object> {
  // static getInitialProps({ isServer }) {
  //   return { isServer }
  // }

  componentDidMount() {
    const props = this.props
    if (!process.browser) return
    const initialState = getStateFromLocalStorage()
    if (initialState) props.mergeState(initialState)
  }

  render() {
    return <App />
  }
}

const mapDispatchToProps = { mergeState }

export default withRedux(createStore, null, mapDispatchToProps)(Index)
