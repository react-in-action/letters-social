import * as types from '../constants/types';

export function createError(error, info) {
    return {
        type: types.app.ERROR,
        error,
        info
    };
}
