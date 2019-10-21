/** @format */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './app/Index';
import {name as appName} from './app.json';


import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore()

const RNRedux  = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)
AppRegistry.registerComponent(appName, () => RNRedux ); 
