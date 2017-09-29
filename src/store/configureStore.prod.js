import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';

import { isServer } from '../utils/environment';
import rootReducer from '../reducers/root';
import crashReporting from '../middleware/crash';

let store;
export default function configureStore(initialState) {
    // On the client, we want to make sure the store is a singleton, but we want to
    // reset it every time on the server
    if (store && !isServer()) {
        return store;
    }
    const hydratedState =
        // We embed the initial state as a data property on an HTML element
        !isServer() && process.env.NODE_ENV === 'production'
            ? window.__INITIAL_STATE__
            : initialState;
    store = createStore(
        rootReducer,
        hydratedState,
        compose(applyMiddleware(thunk, crashReporting))
    );
    return store;
}
