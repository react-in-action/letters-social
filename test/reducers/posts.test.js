import { posts, postIds } from './posts';
import initialState from '../constants/initialState';
import * as types from '../constants/types';

describe('postIds', () => {
    it('should return the initial state', () => {
        expect(postIds(initialState, {})).toEqual(initialState);
    });
    it('should handle the update action', () => {
        const mockPosts = [
            { content: 'post', id: 1 },
            { content: 'post', id: 2 }
        ];
        const mockPostIds = [1, 2];
        expect(
            postIds(initialState, {
                type: types.posts.UPDATE,
                posts: mockPosts
            })
        ).toEqual(mockPostIds);
    });
});

describe('posts', () => {
    it('should return the initial state', () => {
        expect(posts(initialState, {})).toEqual(initialState);
    });
    it('should handle the update action', () => {
        const mockPosts = [
            { content: 'post', id: 1 },
            { content: 'post', id: 2 }
        ];
        expect(
            posts(initialState, { type: types.posts.UPDATE, posts: mockPosts })
        ).toEqual({
            1: { content: 'post', id: 1 },
            2: { content: 'post', id: 2 }
        });
    });
});
