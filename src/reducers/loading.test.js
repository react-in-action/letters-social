import { loading } from './loading';
import * as types from '../constants/types';

describe('Loading reducer', () => {
    const initialState = {
        loading: false
    };
    it('should return the initial state', () => {
        expect(loading(initialState, {})).toEqual(initialState);
    });
    it('should handle loading actions', () => {
        expect(loading(initialState, {
            type: types.app.LOADING
        })).toEqual({
            loading: true
        });
    });
    it('should handle loaded actions', () => {
        expect(loading(initialState, {
            type: types.app.LOADED
        })).toEqual({
            loading: false
        });
    });
});
