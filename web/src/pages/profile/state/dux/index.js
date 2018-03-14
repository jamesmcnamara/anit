// @flow 

import initialState, { type $Profile } from 'pages/profile/state/initialState';

import { ActionManager } from 'shared/ReduxShades'

import { increment } from './increment'
import incrementBy from './incrementBy'
import onIncrement from './onIncrement'

const manager = new ActionManager({
  name: "Profile", 
  initialState, 
  actions: {
    increment,
  }, 
  aliases: {
    incrementBy,
  },
  listeners: [ 
    onIncrement,
  ] 
})

export const profileActions = manager.actions

export default (manager.reducer: (*, *) => *)
