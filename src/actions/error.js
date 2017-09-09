import * as types from '../constants/types';

export function createError(err) {
    return {
        type: types.auth.AUTH_LOGIN_REQUEST,
        error: err.toString()
    };
}
