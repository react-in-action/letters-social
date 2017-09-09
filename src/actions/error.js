import * as types from '../constants/types';

export function createError(err) {
    return {
        type: types.auth.ERROR,
        error: {
            message: err.message,
            name: err.name
        }
    };
}
