import { combineReducers } from 'redux';

import { loading } from './loading';
import { posts, postIds } from './posts';
import { user } from './user';
import { pagination } from './pagination';
import { error } from './error';

/**
 * Root reducer for project
 * @module letters/reducers
 */
const rootReducer = combineReducers({
    loading,
    pagination,
    postIds,
    posts,
    user,
    error
});

export default rootReducer;
