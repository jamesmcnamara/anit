/* @flow */

import type { $State } from 'store/reducers';

export default ({profile}: $State) => ({
  ...profile,
})
