jest.mock('js-cookie');

import Cookies from 'js-cookie';

import { user } from '../../src/reducers/user';
import initialState from '../../src/constants/initialState';
import * as types from '../../src/constants/types';

describe('user', () => {
    it('should return the initial state', () => {
        expect(user(initialState.user, {})).toEqual(initialState.user);
    });
    it(`${types.auth.AUTH_LOGIN_SUCCESS}`, () => {
        const mockUser = {
            name: 'name',
            id: 'id',
            profilePicture: 'pic'
        };
        const mockToken = 'token';
        const expectedState = {
            name: 'name',
            id: 'id',
            profilePicture: 'pic',
            token: mockToken,
            authenticated: true
        };
        expect(
            user(initialState.user, {
                type: types.auth.AUTH_LOGIN_SUCCESS,
                user: mockUser,
                token: mockToken
            })
        ).toEqual(expectedState);
        expect(Cookies).toHaveBeenCalled();
    });
    it(`${types.auth.AUTH_LOGOUT_SUCCESS}, browser`, () => {
        expect(
            user(initialState.user, {
                type: types.auth.AUTH_LOGOUT_SUCCESS
            })
        ).toEqual(initialState.user);
        expect(Cookies).toHaveBeenCalled();
    });
});
