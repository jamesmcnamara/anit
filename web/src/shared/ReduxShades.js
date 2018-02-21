// @flow

export function CreateReducer<S: Object, A>(
  initialState: S,
  actions: Action<A>[],
): ActionManager<S, A> {
  
}

type $ActionTemplate<A, T: {name: string}, P, S> = {
  help?: string,
  creator: T => P,
  type: A,
  reducer: P => S,
}


class ActionManager<A, S> {
  actions: {[A]: T}
  <T, P>create(template: $ActionTemplate<A, T, P, S>) {
    return 
  }
}
