// uploadedActions.js

import {  UPDATE_UPLOADED , UPDATE_UPLOADED_AFTER } from './types';

export const upadteUploaded = (_data) => ({
   type: UPDATE_UPLOADED,
  _data: _data
})

export const upadteDataAfter = (dataAfter) => ({
  type: UPDATE_UPLOADED_AFTER,
  dataAfter: dataAfter
})


