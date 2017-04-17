import * as types from '../constants/types';
import { loading, loaded } from './loading';

describe('loading actions', () => {
    it('should create a loading action', () => {
        const expected = { type: types.app.LOADING };
        const actual = loading();
        expect(actual).toEqual(expected);
    });
    it('should create a loaded action', () => {
        const expected = { type: types.app.LOADED };
        const actual = loaded();
        expect(actual).toEqual(expected);
    });
});
