// @flow

import { mod, add } from 'shades';

export default {
  increment: {
    type: 'INCREMENT',
    creator: (amt: number) => amt,
    reducer: (amt: number) => mod('counter')(add(amt)),
  }
}
