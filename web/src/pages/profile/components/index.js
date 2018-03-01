/* @flow */

import { connect } from 'react-redux';
import * as React from 'react'

import { profileActions } from 'pages/profile/state/dux';

import mapStateToProps from '../state/selectors'

type $Props = {
  counter: number,
} & typeof profileActions

export default connect(mapStateToProps, profileActions)
(function Profile({counter, incrementBy, increment, reset}: $Props) {
  return (
    <div>
      Profile: {counter}
      <input 
        type="button"
        value="Increment"
        onClick={() => increment(10)}
      />
      <br />
      <input 
        type="button"
        value="Increment by"
        onClick={() => incrementBy()}
      />
      <br />
      <input 
        type="button"
        value="Reset"
        onClick={() => reset()}
      />
    </div>
  )
})
