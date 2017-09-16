jest.mock('../../src/backend/auth');
jest.mock('../../src/history');
jest.mock('isomorphic-fetch');

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';

import initialState from '../../src/constants/initialState';
import * as types from '../../src/constants/types';
import { loginSuccess, logoutSuccess, logout, login } from '../../src/actions/auth';
import * as AUTH from '../../src/backend/auth';

const mockStore = configureStore([thunk]);
describe('login actions', () => {
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });
    test('loginSuccess', () => {
        const mockUser = {
            id: 'id',
            name: 'React',
            profilePicture: 'pic'
        };
        const expected = { type: types.auth.AUTH_LOGIN_SUCCESS, user: mockUser };
        const actual = loginSuccess(mockUser);
        expect(actual).toEqual(expected);
    });

    test('logoutSuccess', () => {
        const expected = { type: types.auth.AUTH_LOGOUT_SUCCESS };
        const actual = logoutSuccess();
        expect(actual).toEqual(expected);
    });
    test('logout (success)', async () => {
        AUTH.logUserOut = jest.fn(() => Promise.resolve());
        return store.dispatch(logout()).then(() => {
            const expectedActions = [{ type: types.auth.AUTH_LOGOUT_SUCCESS }];
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
            expect(window.Raven.setUserContext).toHaveBeenCalled();
        });
    });
    test('logout with error', async () => {
        const mockError = new Error('oops');
        AUTH.logUserOut = jest.fn(() => Promise.reject(mockError));
        await store.dispatch(logout());
        const actions = store.getActions();
        const expectedActions = [{ type: types.app.ERROR, error: mockError, info: undefined }];
        expect(actions).toEqual(expectedActions);
    });
    test('login, existing user', async () => {
        const mockToken = 'token';
        const mockUser = {
            id: 'id',
            name: 'name',
            profilePicture: 'pic'
        };
        const mockRemove = jest.fn();
        global.document.getElementById = jest.fn(() => ({ remove: mockRemove }));
        AUTH.loginWithGithub = jest.fn(() => Promise.resolve());
        AUTH.getFirebaseUser = jest.fn(() => Promise.resolve(mockUser));
        AUTH.getFirebaseToken = jest.fn(() => Promise.resolve(mockToken));
        fetch.mockImplementation(() =>
            Promise.resolve({
                status: 200,
                json: jest.fn(() => Promise.resolve(mockUser))
            })
        );
        await store.dispatch(login());
        const actions = store.getActions();
        const expectedActions = [
            { type: 'letters-social/app/loading' },
            {
                type: 'letters-social/auth/login/success',
                user: { id: 'id', name: 'name', profilePicture: 'pic' },
                token: 'token'
            },
            { type: 'letters-social/app/loaded' }
        ];
        expect(actions).toEqual(expectedActions);
        expect(mockRemove).toHaveBeenCalled();
        expect(global.document.getElementById).toHaveBeenCalled();
    });
    test('login, preexisting user', async () => {
        const mockToken = 'token';
        const mockFirebaseUser = {
            id: 'id',
            displayName: 'name',
            photoURL: 'pic'
        };
        const mockUser = {
            id: 'id',
            name: 'name',
            profilePicture: 'pic'
        };
        AUTH.loginWithGithub = jest.fn(() => Promise.resolve());
        AUTH.getFirebaseUser = jest.fn(() => Promise.resolve(mockFirebaseUser));
        AUTH.getFirebaseToken = jest.fn(() => Promise.resolve(mockToken));
        fetch.mockImplementation(() =>
            Promise.resolve({
                status: 404,
                json: jest.fn(() => Promise.resolve(mockUser))
            })
        );
        await store.dispatch(login());
        const actions = store.getActions();
        const expectedActions = [
            { type: 'letters-social/app/loading' },
            {
                type: 'letters-social/auth/login/success',
                user: { id: 'id', name: 'name', profilePicture: 'pic' },
                token: 'token'
            },
            { type: 'letters-social/app/loaded' }
        ];
        expect(actions).toEqual(expectedActions);
    });
});
