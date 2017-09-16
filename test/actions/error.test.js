import * as types from '../../src/constants/types';
import { createError } from '../../src/actions/error';

describe('error actions', () => {
    test('createError', () => {
        const actual = createError('error', 'info');
        const expected = {
            type: types.app.ERROR,
            error: 'error',
            info: 'info'
        };
        expect(actual).toEqual(expected);
    });
});
