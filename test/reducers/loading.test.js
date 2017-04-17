import { loading } from './loading';
import * as types from '../constants/types';

describe('Loading reducer', () => {
    const initialState = false;
    it('should return the initial state', () => {
        expect(loading(initialState, {})).toEqual(initialState);
    });
    it('should handle loading actions', () => {
        expect(loading(initialState, { type: types.app.LOADING })).toEqual(
            true
        );
    });
    it('should handle loaded actions', () => {
        expect(loading(initialState, { type: types.app.LOADED })).toEqual(
            false
        );
    });
});
