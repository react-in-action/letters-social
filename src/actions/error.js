import * as types from '../constants/types';

export function createError(error) {
    return {
        type: types.app.ERROR,
        error
    };
}
