_f36‍.e([["loading",()=>loading]]);let initialState;_f36‍.w('../constants/initialState',[["default",function(v){initialState=v}]]);let types;_f36‍.w('../constants/types',[["*",function(v){types=v}]]);


function loading(state = initialState.loading, action) {
    switch (action.type) {
        case types.app.LOADING:
            return true;
        case types.app.LOADED:
            return false;
        default:
            return state;
    }
}
