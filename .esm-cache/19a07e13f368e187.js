_f36‍.e([["posts",()=>posts],["postIds",()=>postIds]]);let keyBy;_f36‍.w('lodash',[["keyBy",function(v){keyBy=v}]]);let initialState;_f36‍.w('../constants/initialState',[["default",function(v){initialState=v}]]);let types;_f36‍.w('../constants/types',[["*",function(v){types=v}]]);




function posts(state = initialState.posts, action) {
    switch (action.type) {
        case types.posts.UPDATE: {
            return Object.assign({}, state.posts, keyBy(action.posts, 'id'));
        }
        default:
            return state;
    }
}

function postIds(state = initialState.postIds, action) {
    switch (action.type) {
        case types.posts.UPDATE: {
            const nextPostIds = action.posts
                .map(post => post.id)
                .concat(state.postIds);
            return nextPostIds;
        }
        default:
            return state;
    }
}
