import { combineReducers } from 'redux';
import { loading } from './loading';
import { posts, postIds } from './posts';
import { settings } from './settings';
import { user } from './user';

const rootReducer = combineReducers({
    loading,
    posts,
    postIds,
    settings,
    user
});

export default rootReducer;
