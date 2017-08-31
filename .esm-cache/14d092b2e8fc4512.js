_e8f‍.e([["user",()=>user]]);let initialState;_e8f‍.w('../constants/initialState',[["default",function(v){initialState=v}]]);let types;_e8f‍.w('../constants/types',[["*",function(v){types=v}]]);


function user(state = initialState.loading, action) {
    switch (action.type) {
        case types.app.LOADING:
            return true;
        case types.app.LOADED:
            return false;
        default:
            return state;
    }
}
