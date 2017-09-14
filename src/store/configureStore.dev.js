import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root';

let store;
export default initialState => {
    if (store) {
        return store;
    }
    const hydratedState =
        // We embed the initial state as a data property on an HTML element
        typeof window !== 'undefined' && process.env.NODE_ENV === 'production'
            ? JSON.parse(document.getElementById('initialState').dataset.intialReduxState)
            : initialState;
    const createdStore = createStore(
        rootReducer,
        hydratedState,
        compose(
            applyMiddleware(thunk),
            typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    store = createdStore;
    return store;
};
