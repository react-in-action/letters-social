import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';

import { isServer } from '../utils/environment';
import rootReducer from '../reducers/root';

let store;
export default initialState => {
    // On the client, we want to make sure the store is a singleton, but we want to
    // reset it every time on the server
    if (store && !isServer()) {
        return store;
    }
    const createdStore = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            typeof window !== 'undefined' && window.devToolsExtension
                ? window.devToolsExtension()
                : f => f
        )
    );
    store = createdStore;
    return store;
};
