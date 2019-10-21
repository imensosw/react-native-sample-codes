// placeReducer.js

import { ADD_PLACE_TYPE , REMOVE_PLACE   } from '../app/screens/actions/types';

const initialState = {
  placesSatte: []
};

const placeReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PLACE_TYPE :
      return {
        ...state,
        placesSatte: state.placesSatte.concat({
          key: Math.random(),
          value: action.payload
        })
      }
    case REMOVE_PLACE :
      const numIndex = parseInt(action.id)
      return {
        placesSatte: [
          ...state.placesSatte.slice(0, numIndex),
          ...state.placesSatte.slice(numIndex+ 1)
        ]
      }

    default: return state;
  }
}

export default placeReducer; 