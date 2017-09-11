jest.mock('../../src/shared/http');
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import initialState from '../../src/constants/initialState';
import * as types from '../../src/constants/types';
import {
    createNewPost,
    getPostsForPage,
    getPostByID,
    updateAvailablePosts,
    updatePaginationLinks
} from '../../src/actions/posts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('post actions', () => {
    let sandbox;
    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });
    afterEach(function () {
        sandbox.restore();
    });
    describe('getPostsForPage', () => {
        it('should create the right actions', () => {
            const store = mockStore(initialState);
            const updatePaginationLinksStub = sandbox.stub()
            return store.dispatch(getPostsForPage()).then(() => {
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

    describe('getPostByID', () => {
        it(' should create the right actions', () => {
            const store = mockStore();
            return store.dispatch(getPostByID('id')).then(() => {
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

    describe('updateAvailablePosts', () => {
        it(' should create the right actions', () => {
            const samplePost = {
                id: 1,
                content: 'content'
            };
            const expectedActions = [
                {
                    type: types.posts.UPDATE,
                    error: null,
                    posts: [samplePost]
                }
            ];
            const store = mockStore();
            store.dispatch(updateAvailablePosts([samplePost]));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
