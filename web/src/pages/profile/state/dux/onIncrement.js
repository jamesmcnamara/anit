// @flow

import { mod, add } from 'shades';

import { createListenerFor } from 'shared/ReduxShades';

import { increment } from './increment';


export default createListenerFor(increment, (amt: number) => mod('counter')(add(20)))
