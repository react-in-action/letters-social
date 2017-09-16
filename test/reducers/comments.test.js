import { comments, commentIds } from '../../src/reducers/comments';
import initialState from '../../src/constants/initialState';
import * as types from '../../src/constants/types';

describe('comments', () => {
    test('should return the initial state', () => {
        expect(comments(initialState.comments, {})).toEqual(initialState.comments);
    });
    test(`${types.comments.GET}`, () => {
        const existingState = { 1: { id: 1, content: 'content' } };
        const mockComments = [
            { id: 1, content: 'content' },
            { id: 2, content: 'content' },
            { id: 3, content: 'content' }
        ];
        const expectedState = {
            1: { id: 1, content: 'content' },
            2: { id: 2, content: 'content' },
            3: { id: 3, content: 'content' }
        };
        expect(
            comments(existingState, {
                type: types.comments.GET,
                comments: mockComments
            })
        ).toEqual(expectedState);
    });
    test(`${types.comments.CREATE}`, () => {
        const existingState = { 1: { id: 1, content: 'content' } };
        const mockComment = { id: 2, content: 'content' };
        const expectedState = {
            1: { id: 1, content: 'content' },
            2: { id: 2, content: 'content' }
        };
        expect(
            comments(existingState, {
                type: types.comments.CREATE,
                comment: mockComment
            })
        ).toEqual(expectedState);
    });
});

describe('commentIds', () => {
    test('should return the initial state', () => {
        expect(commentIds(initialState.commentIds, {})).toEqual(initialState.commentIds);
    });
    test(`${types.comments.GET}`, () => {
        const existingState = [1, 2, 3];
        const mockComments = [{ id: 1 }, { id: 2 }, { id: 5 }];
        const expectedState = [1, 2, 3, 5];
        expect(
            commentIds(existingState, {
                type: types.comments.GET,
                comments: mockComments
            })
        ).toEqual(expectedState);
    });
    test(`${types.comments.CREATE}`, () => {
        const existingState = [1, 2, 3];
        const expectedState = [1, 2, 3, 4];
        expect(
            commentIds(existingState, {
                type: types.comments.CREATE,
                comment: {
                    id: 4,
                    content: 'content'
                }
            })
        ).toEqual(expectedState);
    });
});
