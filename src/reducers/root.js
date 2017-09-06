import { combineReducers } from 'redux';

import { error } from './error';
import { loading } from './loading';
import { pagination } from './pagination';
import { posts, postIds } from './posts';
import { user } from './user';
import { comments, commentIds } from './comments';

/**
 * Root reducer for project
 * @module letters/reducers
 */
const rootReducer = combineReducers({
    commentIds,
    comments,
    error,
    loading,
    pagination,
    postIds,
    posts,
    user
});

export default rootReducer;
