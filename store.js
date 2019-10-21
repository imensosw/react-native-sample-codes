// store.js

import { createStore, combineReducers } from 'redux';
import placeReducer from './reducers/placeReducer';
import notificationReducer from './reducers/notificationReducer';
import documentReducer from './reducers/documentReducer';

const rootReducer = combineReducers({
  placesStore: placeReducer ,
  notificationReducer: notificationReducer ,
  documentReducer: documentReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore; 