/* @flow */

import { compose } from 'redux';
import { set, updateAll } from 'shades';

import _ from 'lodash';

type ActionCreatorType<S> = <T1, T2, T3, T4, T5, P, T>($ActionTemplate<T1, T2, T3, T4, T5, P, S, T>) => ({type: $ElementType<$ActionTemplate<T1, T2, T3, T4, T5, P, S, T>, "type">, payload: P})

type Action<A: Object, S> = $Values<$ObjMap<A, ActionCreatorType<S>>>


type ExtractCreatorType<S> = <T1, T2, T3, T4, T5, P, T: string>($ActionTemplate<T1, T2, T3, T4, T5, P, S, T>) => ((T1, T2, T3, T4, T5) => {type: $ElementType<$ActionTemplate<T1, T2, T3, T4, T5, P, S, T>, "type">, payload: P})
type CreateSetter = <T>(T) => ((arg: T) => T)

type $ActionTemplate<T1, T2, T3, T4, T5, P, S, T: string> = {
  creator: (T1, T2, T3, T4, T5) => P,
  reducer: P => S => S,
  type: T,
}

const last = a => b => b
const BATCH_TYPE = "Batch Action"

export function batch<A>(...actions: A) {
  return {
    type: BATCH_TYPE,
    payload: actions,
  }
}

type ToActions<A, S> = $ObjMap<A, ExtractCreatorType<S>>
type Setters<S> = {set: $ObjMap<S, CreateSetter>}
type Reset = {
  reset(): {type: string}
}

opaque type Listener = {
  type: string,
  reducer: Function,
}

type Config<Actions: Object, Aliases: Object, State> = {
  name: string,
  initialState: State,
  actions?: Actions,
  aliases?: Aliases,
  listeners?: Listener[], 
}

export const createListenerFor = <T1, T2, T3, T4, T5, P, S1, S2, T: string>(action: $ActionTemplate<T1, T2, T3, T4, T5, P, S1, T>, listener: P => S2 => S2): Listener => ({
  type: action.type,
  reducer: listener,
})

  

export class ActionManager<Actions: Object, Aliases: Object, State> {
  name: string
  initialState: State
  actions: ToActions<Actions, State> & Aliases & Setters<State> & Reset
  reducerObj: {[string]: Function}

  constructor({name, initialState, actions, aliases, listeners}: Config<Actions, Aliases, State>) {
    this.reducerObj = _.transform(actions, (acc, {type, reducer}) =>
      acc[type] = reducer, {})
    
     _.forEach(listeners, ({type, reducer}) => {
       let oldReducer
       if (oldReducer = this.reducerObj[type]) {
         this.reducerObj[type] = payload => updateAll(
              oldReducer(payload),
              reducer(payload),
         ) 
       } else {
         this.reducerObj[type] = reducer
       }
    })

    this.initialState = initialState
    this.actions = {
      ..._.mapValues(actions, ({creator, type}) => 
        compose(creator, payload => ({type, payload}))),

      ...(aliases || {}),

      set: _.mapValues(initialState, field => value => ({ 
        type: this.setterType, payload: { field, value, }})),

      reset: () => ({
        type: this.resetType,
      })
    }
  }

  get setterType(): string {
    return `Setter for ${this.name}`
  }

  get resetType(): string {
    return `Reset for ${this.name}`
  }

  reducer = (_state: State, action: Action<Actions, State>): State  => {
    const state = _state || this.initialState
    if (action && action.type) {
      if (action.type === this.setterType) {
        return set(action.payload.field)(action.payload.value)(state)
      }

      if (action.type === this.resetType) {
        return this.initialState
      }
      
      if (action.type === BATCH_TYPE) {
        return action.payload.reduce(this.reducer, state)
      }
    
      return (this.reducerObj[action.type] || last)
        (action && action.payload)
        (state)

    }
    return state
  }
}      
