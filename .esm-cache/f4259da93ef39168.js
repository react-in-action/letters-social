let thunk;_3ef‍.w('redux-thunk',[["default",function(v){thunk=v}]]);let createStore,compose,applyMiddleware;_3ef‍.w('redux',[["createStore",function(v){createStore=v}],["compose",function(v){compose=v}],["applyMiddleware",function(v){applyMiddleware=v}]]);let rootReducer;_3ef‍.w('../reducers/root',[["default",function(v){rootReducer=v}]]);



let store;
_3ef‍.d(initialState => {
    if (store) {
        return store;
    }
    const createdStore = createStore(
        rootReducer,
        typeof window !== 'undefined' ? window.__INTIIAL_STATE__ : initialState,
        compose(
            applyMiddleware(thunk),
            typeof window !== 'undefined' && window.devToolsExtension
                ? window.devToolsExtension()
                : f => f
        )
    );
    store = createdStore;
    return store;
});
