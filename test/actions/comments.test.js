jest.mock('../../src/shared/http');

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import initialState from '../../src/constants/initialState';
import * as types from '../../src/constants/types';
import {
    showComments,
    toggleComments,
    updateAvailableComments,
    createComment,
    getCommentsForPost
} from '../../src/actions/comments';
import * as API from '../../src/shared/http';

const mockStore = configureStore([thunk]);
describe('login actions', () => {
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });
    it('showComments', () => {
        const postId = 'id';
        const actual = showComments(postId);
        const expected = {
            type: types.comments.SHOW,

            postId
        };
        expect(actual).toEqual(expected);
    });
    it('toggleComments', () => {
        const postId = 'id';
        const actual = toggleComments(postId);
        const expected = {
            type: types.comments.TOGGLE,

            postId
        };
        expect(actual).toEqual(expected);
    });
    it('updateAvailableComments', () => {
        const comments = ['comments'];
        const actual = updateAvailableComments(comments);
        const expected = {
            type: types.comments.GET,

            comments
        };
        expect(actual).toEqual(expected);
    });
    it('createComment', async () => {
        const mockComment = { content: 'great post!' };
        API.createComment = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve([mockComment])
            });
        });
        await store.dispatch(createComment(mockComment));
        const actions = store.getActions();
        const expectedActions = [
            {
                type: types.comments.CREATE,

                comment: [mockComment]
            }
        ];
        expect(actions).toEqual(expectedActions);
    });
    it('getCommentsForPost', async () => {
        const postId = 'id';
        const comments = [{ cotent: 'great stuff' }];
        API.fetchCommentsForPost = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve(comments)
            });
        });
        await store.dispatch(getCommentsForPost(postId));
        const actions = store.getActions();
        const expectedActions = [
            {
                type: types.comments.GET,

                comments
            }
        ];
        expect(actions).toEqual(expectedActions);
    });
});
