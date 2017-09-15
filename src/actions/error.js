import * as types from '../constants/types';

/**
 * Create an error
 * @method createError
 * @module letters/actions
 * @param  {object}    error Error object, either from a component or application code
 * @param  {string}    info  error description
 * @return {object}
 */
export function createError(error, info) {
    return {
        type: types.app.ERROR,
        error,
        info
    };
}
