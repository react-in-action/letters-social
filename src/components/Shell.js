import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import initialReduxState from '../constants/initialState';

const store = configureStore(initialReduxState);
/**
 * App shell, wraps everything in the provider
 * @method Shell
 * @param  {[type]} props [description]
 */
const Shell = props => <Provider store={store}>{props.children}</Provider>;

export default Shell;
