import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import initialReduxState from '../constants/initialState';

const store = configureStore(initialReduxState);

const Shell = props => (
    <Provider store={store}>
        {props.children}
    </Provider>
);

export default Shell;
