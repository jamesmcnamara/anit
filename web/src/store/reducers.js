// @flow

import { combineReducers } from 'redux';

import type { $Profile } from 'pages/profile/state/initialState';
import profile from 'pages/profile/state/dux'

export type $State = {
  profile: $Profile,
}

export default combineReducers({
  profile,
})
