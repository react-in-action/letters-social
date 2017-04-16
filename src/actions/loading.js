import * as types from '../constants/types';

export function loading() {
    return {
        type: types.app.LOADING
    };
}

export function loaded() {
    return {
        type: types.app.LOADED
    };
}
