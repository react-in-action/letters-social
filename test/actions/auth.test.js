import * as types from '../../src/constants/types';
import { loginSuccess, logoutSuccess } from '../../src/actions/auth';

jest.mock('firebase');
jest.mock('../../src/history');

describe('login actions', () => {
    it('loginSuccess', () => {
        const mockUser = {
            id: 'id',
            name: 'React',
            profilePicture: 'pic'
        };
        const expected = {
            type: types.auth.AUTH_LOGIN_SUCCESS,
            error: null,
            user: mockUser
        };
        const actual = loginSuccess(mockUser);
        expect(actual).toEqual(expected);
    });
    it('logoutSuccess', () => {
        const mockUser = {
            id: 'id',
            name: 'React',
            profilePicture: 'pic'
        };
        const expected = {
            type: types.auth.AUTH_LOGOUT_SUCCESS,
            error: null,
            user: mockUser
        };
        const actual = logoutSuccess(mockUser);
        expect(actual).toEqual(expected);
    });
});
