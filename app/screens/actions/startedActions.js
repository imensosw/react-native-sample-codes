// startedActions.js

import {  UPDATE_STARTED , UPDATE_STARTED_AFTER } from './types';

export const upadteStarted = (_dataStarted) => ({
   type: UPDATE_STARTED,
   _dataStarted: _dataStarted
})

export const upadteDataAfterStarted = (dataAfterStarted) => ({
   type: UPDATE_STARTED_AFTER,
   dataAfterStarted: dataAfterStarted 
 })

