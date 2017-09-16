import { pagination } from '../../src/reducers/pagination';
import initialState from '../../src/constants/initialState';
import * as types from '../../src/constants/types';

describe('pagination', () => {
    test('should return the initial state', () => {
        expect(pagination(initialState.pagination, {})).toEqual(initialState.pagination);
    });
    test(`${types.posts.UPDATE_LINKS}`, () => {
        const existingState = initialState.pagination;
        const mockLinks = {
            first: { url: 'first' },
            last: { url: 'last' },
            prev: { url: 'prev' },
            next: { url: 'next' }
        };
        const expectedState = {
            first: 'first',
            last: 'last',
            prev: 'prev',
            next: 'next'
        };
        expect(
            pagination(existingState, {
                type: types.posts.UPDATE_LINKS,
                links: mockLinks
            })
        ).toEqual(expectedState);
    });
});
