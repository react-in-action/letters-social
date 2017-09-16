import { error } from '../../src/reducers/error';
import * as types from '../../src/constants/types';
import initialState from '../../src/constants/initialState';

describe('Loading reducer', () => {
    const state = initialState.error;
    test('should return the initial state', () => {
        expect(error(state, {})).toEqual(state);
    });
    test('should handle error actions', () => {
        const mockError = 'error';
        const mockErrorInfo = 'info';
        const expectedState = mockError;
        expect(
            error(state, {
                type: types.app.ERROR,
                info: mockErrorInfo,
                error: mockError
            })
        ).toEqual(expectedState);
    });
});
