/* @flow */

import { connect } from 'react-redux';
import * as React from 'react'
import mapStateToProps from '../state/selectors'

type $Props = {
  counter: number,
}

export default connect(mapStateToProps)
(function Profile({counter}: $Props) {
  return (
    <div>
      Profile: {counter}
    </div>
  )
})
