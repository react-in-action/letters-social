import * as types from '../../src/constants/types';
import { loading, loaded } from '../../src/actions/loading';

describe('loading actions', () => {
    test('should create a loading action', () => {
        const expected = { type: types.app.LOADING };
        const actual = loading();
        expect(actual).toEqual(expected);
    });
    test('should create a loaded action', () => {
        const expected = { type: types.app.LOADED };
        const actual = loaded();
        expect(actual).toEqual(expected);
    });
});
