import { loading } from '../../src/reducers/loading';
import * as types from '../../src/constants/types';
import initialState from '../../src/constants/initialState';

describe('Loading reducer', () => {
    const state = initialState.loading;
    it('should return the initial state', () => {
        expect(loading(state, {})).toEqual(state);
    });
    it('should handle loading actions', () => {
        expect(loading(state, { type: types.app.LOADING })).toEqual(true);
    });
    it('should handle loaded actions', () => {
        expect(loading(state, { type: types.app.LOADED })).toEqual(false);
    });
});
