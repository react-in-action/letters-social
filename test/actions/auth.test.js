jest.mock('../../src/backend/auth');
jest.mock('../../src/history');

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import initialState from '../../src/constants/initialState';
import * as types from '../../src/constants/types';
import { loginSuccess, logoutSuccess, logout } from '../../src/actions/auth';

const mockStore = configureStore([thunk]);
describe('login actions', () => {
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });
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
    it('logout', () => {
        return store
            .dispatch(logout())
            .then(() => {})
            .catch(err => console.error(err));
    });
});
