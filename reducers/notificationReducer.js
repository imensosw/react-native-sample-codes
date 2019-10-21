// placeReducer.js

import {  UPDATE_NOTIFICATION_COUNT } from '../app/screens/actions/types';

const initialState = {
  notificationCount : 0
};

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_NOTIFICATION_COUNT  :
      return {
        ...state,
        notificationCount:  action.count
      }
    default: return state;
  }
}

export default notificationReducer; 