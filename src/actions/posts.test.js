jest.mock('../shared/http');
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../constants/types';
import { createNewPost, getPosts, getPost, updatePosts } from './posts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async post actions', () => {
    describe('getPosts', () => {
        it('should create the right actions', () => {
            const store = mockStore({
                postIds: []
            });
            return store.dispatch(getPosts()).then(() => {
                const [
                    loadingAction,
                    updateAction,
                    loadedAction
                ] = store.getActions();
                expect(loadingAction).toEqual({
                    type: types.app.LOADING
                });
                expect(loadedAction).toEqual({
                    type: types.app.LOADED
                });
                expect(updateAction.type).toEqual(types.posts.UPDATE);
            });
        });
    });

    describe('createNewPost', () => {
        it(' should create the right actions', () => {
            const store = mockStore({
                postIds: []
            });
            const newPost = {
                id: 'id',
                content: 'a post!'
            };
            return store.dispatch(createNewPost(newPost)).then(() => {
                const [
                    loadingAction,
                    secondLoadingAction,
                    updatePostsAction
                ] = store.getActions();
                expect(loadingAction).toEqual({ type: types.app.LOADING });
                expect(secondLoadingAction).toEqual({
                    type: types.app.LOADING
                });
                expect(updatePostsAction.type).toEqual(types.posts.UPDATE);
            });
        });
    });

    describe('getPost', () => {
        it(' should create the right actions', () => {
            const store = mockStore();
            return store.dispatch(getPost('id')).then(() => {
                const [
                    loadingAction,
                    updateAction,
                    loadedAction
                ] = store.getActions();
                expect(loadingAction).toEqual({ type: types.app.LOADING });
                expect(loadedAction).toEqual({ type: types.app.LOADED });
                expect(updateAction.type).toEqual(types.posts.UPDATE);
            });
        });
    });

    describe('updatePosts', () => {
        it(' should create the right actions', () => {
            const samplePost = {
                id: 1,
                content: 'content'
            };
            const expectedActions = [
                {
                    type: types.posts.UPDATE,
                    error: false,
                    posts: [samplePost]
                }
            ];
            const store = mockStore();
            store.dispatch(updatePosts([samplePost]));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
