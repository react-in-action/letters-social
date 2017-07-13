import { combineReducers } from 'redux';
import { loading } from './loading';
import { posts, postIds } from './posts';
import { user } from './user';

const rootReducer = combineReducers({
    loading,
    posts,
    postIds,
    user
});

export default rootReducer;
