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
            const user = action.user;
            return Object.assign({}, state.user, {
                authenticated: true,
                name: user.name,
                id: user.id,
                profilePicture: user.profilePicture || '/static/assets/users/4.jpeg'
            });
        case types.auth.AUTH_LOGOUT_SUCCESS:
            return Object.assign({}, state.user, initialState.user);
        default:
            return state;
    }
}
