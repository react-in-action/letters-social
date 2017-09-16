import { posts, postIds } from '../../src/reducers/posts';
import initialState from '../../src/constants/initialState';
import * as types from '../../src/constants/types';

describe('posts', () => {
    test('should return the initial state', () => {
        expect(posts(initialState.posts, {})).toEqual(initialState.posts);
    });
    test(`${types.posts.GET}`, () => {
        const existingState = { 1: { id: 1, content: 'content' } };
        const mockposts = [
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
            posts(existingState, {
                type: types.posts.GET,
                posts: mockposts
            })
        ).toEqual(expectedState);
    });
    test(`${types.posts.CREATE}`, () => {
        const existingState = { 1: { id: 1, content: 'content' } };
        const mockpost = { id: 2, content: 'content' };
        const expectedState = {
            1: { id: 1, content: 'content' },
            2: { id: 2, content: 'content' }
        };
        expect(
            posts(existingState, {
                type: types.posts.CREATE,
                post: mockpost
            })
        ).toEqual(expectedState);
    });
    test(`${types.comments.SHOW}`, function() {
        const existingState = {
            1: { id: 1, content: 'content' },
            2: { id: 2, content: 'content', showComments: false }
        };
        const expectedState = {
            1: { id: 1, content: 'content' },
            2: { id: 2, content: 'content', showComments: true }
        };
        expect(
            posts(existingState, {
                type: types.comments.SHOW,
                postId: 2
            })
        ).toEqual(expectedState);
    });
    test(`${types.comments.TOGGLE}`, function() {
        const existingState = {
            1: { id: 1, content: 'content' },
            2: { id: 2, content: 'content', showComments: false }
        };
        const expectedState = {
            1: { id: 1, content: 'content' },
            2: { id: 2, content: 'content', showComments: true }
        };
        expect(
            posts(existingState, {
                type: types.comments.TOGGLE,
                postId: 2
            })
        ).toEqual(expectedState);
    });
    test(`${types.posts.LIKE}`, function() {
        const postUpdatedWithLike = { id: 1, content: 'content', likes: [1, 2, 3] };
        const existingState = {
            1: { id: 1, content: 'content', likes: [1] },
            2: { id: 2, content: 'content' }
        };
        const expectedState = {
            1: { id: 1, content: 'content', likes: [1, 2, 3] },
            2: { id: 2, content: 'content' }
        };
        expect(
            posts(existingState, {
                type: types.posts.LIKE,
                post: postUpdatedWithLike
            })
        ).toEqual(expectedState);
    });
    test(`${types.posts.UNLIKE}`, function() {
        const postUpdatedWithUnlike = { id: 1, content: 'content', likes: [1, 2] };
        const existingState = {
            1: { id: 1, content: 'content', likes: [1, 2, 3] },
            2: { id: 2, content: 'content' }
        };
        const expectedState = {
            1: { id: 1, content: 'content', likes: [1, 2] },
            2: { id: 2, content: 'content' }
        };
        expect(
            posts(existingState, {
                type: types.posts.UNLIKE,
                post: postUpdatedWithUnlike
            })
        ).toEqual(expectedState);
    });
    test(`${types.comments.CREATE}`, function() {
        const comment = { id: 2, postId: 1, content: 'comment' };
        const existingState = {
            1: { id: 1, content: 'content', comments: [{ id: 1, content: 'comment' }] },
            2: { id: 2, content: 'content' }
        };
        const expectedState = {
            1: {
                id: 1,
                content: 'content',
                comments: [{ id: 1, content: 'comment' }, { id: 2, content: 'comment', postId: 1 }]
            },
            2: { id: 2, content: 'content' }
        };
        expect(
            posts(existingState, {
                type: types.comments.CREATE,
                comment
            })
        ).toEqual(expectedState);
    });
});

describe('postIds', () => {
    test('should return the initial state', () => {
        expect(postIds(initialState.postIds, {})).toEqual(initialState.postIds);
    });
    test(`${types.posts.GET}`, () => {
        const existingState = [1, 2, 3];
        const mockposts = [{ id: 1 }, { id: 2 }, { id: 5 }];
        const expectedState = [1, 2, 3, 5];
        expect(
            postIds(existingState, {
                type: types.posts.GET,
                posts: mockposts
            })
        ).toEqual(expectedState);
    });
    test(`${types.posts.CREATE}`, () => {
        const existingState = [1, 2, 3];
        const expectedState = [1, 2, 3, 4];
        expect(
            postIds(existingState, {
                type: types.posts.CREATE,
                post: {
                    id: 4,
                    content: 'content'
                }
            })
        ).toEqual(expectedState);
    });
    test(`${types.posts.CREATE}, prevent duplicate`, () => {
        const existingState = [1, 2, 3, 4];
        const expectedState = [1, 2, 3, 4];
        expect(
            postIds(existingState, {
                type: types.posts.CREATE,
                post: {
                    id: 4,
                    content: 'content'
                }
            })
        ).toEqual(expectedState);
    });
});
