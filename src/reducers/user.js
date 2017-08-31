import initialState from '../constants/initialState';
import * as types from '../constants/types';

/**
 * The user reducer is responsible
 * @method user
 * @module letters/reducers
 * @param  {object} [state=initialState.user] state
 * @param  {object} action                    redux action
 * @return {object}                           next state
 */
export function user(state = initialState.user, action) {
    switch (action.type) {
        case types.auth.AUTH_LOGIN_SUCCESS:
            const user = action.payload;
            return Object.assign({}, state.user, {
                authenticated: true,
                email: user.email,
                name: user.displayName,
                id: user.uid,
                avatar: user.photoURL || 'https://cdn.react.sh/assets/profile-pictures/1.png'
            });
        case types.auth.AUTH_LOGOUT_SUCCESS:
            return Object.assign({}, state.user, initialState.user);
        default:
            return state;
    }
}
