// @flow 

import initialState, { type $Profile } from 'pages/profile/state/initialState';

import { ActionManager } from 'shared/ReduxShades'

import increment from './increment'
import incrementBy from './incrementBy'

const manager = new ActionManager({
  name: "Profile", 
  initialState, 
  actions: {
    ...increment,
  }, 
  aliases: {
    ...incrementBy,
  }
})

export const profileActions = manager.actions

export default (manager.reducer: (*, *) => *)
