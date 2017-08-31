_3ef‍.e([["default",()=>configureStore]]);let thunk;_3ef‍.w('redux-thunk',[["default",function(v){thunk=v}]]);let createStore,compose,applyMiddleware;_3ef‍.w('redux',[["createStore",function(v){createStore=v}],["compose",function(v){compose=v}],["applyMiddleware",function(v){applyMiddleware=v}]]);let rootReducer;_3ef‍.w('../reducers/root',[["default",function(v){rootReducer=v}]]);let crashReporting;_3ef‍.w('../middleware/crash',[["default",function(v){crashReporting=v}]]);





let store;
function configureStore(initialState) {
    if (store) {
        return store;
    }
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk, crashReporting))
    );
    return store;
}
