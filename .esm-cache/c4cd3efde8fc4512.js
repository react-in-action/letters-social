let combineReducers;_e8f‍.w('redux',[["combineReducers",function(v){combineReducers=v}]]);let loading;_e8f‍.w('./loading',[["loading",function(v){loading=v}]]);let posts,postIds;_e8f‍.w('./posts',[["posts",function(v){posts=v}],["postIds",function(v){postIds=v}]]);let user;_e8f‍.w('./user',[["user",function(v){user=v}]]);




const rootReducer = combineReducers({
    loading,
    posts,
    postIds,
    user
});

_e8f‍.d(rootReducer);
