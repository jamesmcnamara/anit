// @flow

import { mod, add } from 'shades';

export const increment = {
  type: 'INCREMENT',
  creator: (amt: number) => amt,
  reducer: (amt: number) => mod('counter')(add(amt)),
}
