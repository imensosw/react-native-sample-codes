// documentReducer.js

import {  UPDATE_UPLOADED , UPDATE_STARTED , UPDATE_COMPLETED , UPDATE_UPLOADED_AFTER , UPDATE_STARTED_AFTER ,UPDATE_COMPLETED_AFTER } from '../app/screens/actions/types';

const initialState = {
  _data : [],
  dataAfter : 0 ,
  _dataStarted  : [],
  dataAfterStarted : 0 ,
  _dataCompleted : [],
  dataAfterCompleted : 0 
};

const documentReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_UPLOADED  :
    return {
      ...state,
      _data:  action._data
    }
    case UPDATE_UPLOADED_AFTER  :
    return {
      ...state,
      dataAfter:  action.dataAfter
    }
    case UPDATE_STARTED  :
    return {
      ...state,
      _dataStarted:  action._dataStarted
    }
    case UPDATE_STARTED_AFTER  :
    return {
      ...state,
      dataAfterStarted:  action.dataAfterStarted
    }
    case UPDATE_COMPLETED  :
    return {
      ...state,
      _dataCompleted:  action._dataCompleted
    }
    case UPDATE_COMPLETED_AFTER  :
    return {
      ...state,
      dataAfterCompleted:  action.dataAfterCompleted
    }
    default: return state;
  }
}
export default documentReducer; 