// @flow

import { batch } from 'shared/ReduxShades';

import { profileActions } from './';

export default {
  incrementBy: () => batch(
    profileActions.increment(1),
    profileActions.increment(5),
  )
}
