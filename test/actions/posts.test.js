jest.mock('parse-link-header');
jest.mock('../../src/shared/http');
jest.mock('../../src/actions/comments');

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import parseLinkHeader from 'parse-link-header';

import initialState from '../../src/constants/initialState';
import * as types from '../../src/constants/types';
import {
    updateAvailablePosts,
    updatePaginationLinks,
    like,
    unlike,
    createNewPost,
    getPostsForPage,
    loadPost
} from '../../src/actions/posts';
import { getCommentsForPost } from '../../src/actions/comments';
import * as API from '../../src/shared/http';

const mockStore = configureStore([thunk]);
describe('login actions', () => {
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });
    test('updateAvailablePosts', () => {
        const posts = ['post'];
        const actual = updateAvailablePosts(posts);
        const expected = {
            type: types.posts.GET,
            posts
        };
        expect(actual).toEqual(expected);
    });
    test('updatePaginationLinks', () => {
        const links = ['link'];
        const actual = updatePaginationLinks(links);
        const expected = {
            type: types.posts.UPDATE_LINKS,
            links
        };
        expect(actual).toEqual(expected);
    });
    test('like', async () => {
        const mockPost = {
            id: 'id'
        };
        API.likePost = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve(mockPost)
            });
        });
        await store.dispatch(like(mockPost.id));
        const actions = store.getActions();
        const expectedActions = [
            {
                type: types.posts.LIKE,

                post: { id: 'id' }
            }
        ];
        expect(actions).toEqual(expectedActions);
    });
    test('unlike', async () => {
        const mockPost = {
            id: 'id'
        };
        API.unlikePost = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve(mockPost)
            });
        });
        await store.dispatch(unlike(mockPost.id));
        const actions = store.getActions();
        const expectedActions = [
            {
                type: types.posts.UNLIKE,
                post: { id: 'id' }
            }
        ];
        expect(actions).toEqual(expectedActions);
    });
    test('createNewPost, success', async () => {
        const modifiedStoreState = Object.assign(initialState, {
            user: {
                id: '1'
            }
        });
        store = mockStore(modifiedStoreState);
        const mockPost = {
            content: 'content'
        };
        API.createPost = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve(mockPost)
            });
        });
        await store.dispatch(createNewPost(mockPost));
        const actions = store.getActions();
        const expectedActions = [
            {
                type: types.posts.CREATE,
                post: { content: 'content', userId: '1' }
            }
        ];
        expect(actions).toEqual(expectedActions);
    });
    test('createNewPost, error', async () => {
        const modifiedStoreState = Object.assign(initialState, {
            user: {
                id: '1'
            }
        });
        store = mockStore(modifiedStoreState);
        const mockError = 'error';
        const mockPost = {
            content: 'content'
        };
        API.createPost = jest.fn(() => Promise.reject(mockError));
        await store.dispatch(createNewPost(mockPost));
        const actions = store.getActions();
        const expectedActions = [
            {
                type: types.app.ERROR,
                error: mockError
            }
        ];
        expect(actions).toEqual(expectedActions);
    });
    test('getPostsForPage, success', async () => {
        const mockPosts = [{ content: 'post' }];
        const mockLinks = {
            first: 'url'
        };
        const mockRes = {
            headers: {
                get: jest.fn()
            },
            json: () => Promise.resolve(mockPosts)
        };
        parseLinkHeader.mockImplementation(() => mockLinks);
        API.fetchPosts = jest.fn(() => Promise.resolve(mockRes));
        await store.dispatch(getPostsForPage());
        const actions = store.getActions();
        const expectedActions = [
            {
                type: types.posts.UPDATE_LINKS,
                links: { first: 'url' }
            },
            {
                type: types.posts.GET,
                posts: [{ content: 'post' }]
            }
        ];
        expect(actions).toEqual(expectedActions);
    });
    test('getPostsForPage, error', async () => {
        const mockError = 'error';
        API.fetchPosts = jest.fn(() => Promise.reject(mockError));
        await store.dispatch(getPostsForPage());
        const actions = store.getActions();
        const expectedActions = [
            {
                type: types.app.ERROR,
                error: mockError
            }
        ];
        expect(actions).toEqual(expectedActions);
    });
    test('loadPost, success', async () => {
        const mockPost = {
            id: 'id',
            content: 'content'
        };
        const mockRes = {
            json: () => Promise.resolve(mockPost)
        };
        API.fetchPost = jest.fn(() => Promise.resolve(mockRes));
        getCommentsForPost.mockImplementation(() => ({ type: types.comments.GET }));
        await store.dispatch(loadPost(mockPost.id));
        const actions = store.getActions();
        const expectedActions = [
            {
                type: types.posts.GET,
                posts: [{ id: 'id', content: 'content' }]
            },
            { type: types.comments.GET }
        ];

        expect(actions).toEqual(expectedActions);
    });
    test('loadPost, error', async () => {
        const mockPost = {
            id: 'id',
            content: 'content'
        };
        const mockError = 'error';
        API.fetchPost = jest.fn(() => Promise.reject(mockError));
        await store.dispatch(loadPost(mockPost.id));
        const actions = store.getActions();
        const expectedActions = [
            {
                type: types.app.ERROR,
                error: 'error',
                info: undefined
            }
        ];
        expect(actions).toEqual(expectedActions);
        expect(getCommentsForPost).toHaveBeenCalled();
    });
});
