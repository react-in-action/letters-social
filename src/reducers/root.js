import { combineReducers } from 'redux';
import { loading } from './loading';
import { posts, postIds } from './posts';

const rootReducer = combineReducers({
    loading,
    posts,
    postIds
});

export default rootReducer;
