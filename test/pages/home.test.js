jest.mock('mapbox');
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import { Home, mapStateToProps, mapDispatchToProps } from '../../src/pages/home';
import configureStore from '../../src/store/configureStore';
import initialState from '../../src/constants/initialState';

describe('Single post page', () => {
    const state = Object.assign({}, initialState, {
        posts: {
            2: { content: 'stuff', likes: [], date: 2 },
            1: { content: 'stuff', likes: [], date: 1 }
        },
        postIds: [1, 2]
    });
    const store = configureStore(state);
    test('mapStateToProps', () => {
        expect(mapStateToProps(state)).toEqual({
            posts: [
                { content: 'stuff', likes: [], date: 2 },
                { content: 'stuff', likes: [], date: 1 }
            ]
        });
    });
    test('mapDispatchToProps', () => {
        const dispatchStub = jest.fn();
        const mappedDispatch = mapDispatchToProps(dispatchStub);
        expect(mappedDispatch.actions.createNewPost).toBeDefined();
        expect(mappedDispatch.actions.getPostsForPage).toBeDefined();
        expect(mappedDispatch.actions.showComments).toBeDefined();
        expect(mappedDispatch.actions.createError).toBeDefined();
        expect(mappedDispatch.actions.getNextPageOfPosts).toBeDefined();
    });
    test('should render posts', function() {
        const props = {
            posts: [
                { id: 1, content: 'stuff', likes: [], date: 1 },
                { id: 2, content: 'stuff', likes: [], date: 2 }
            ],
            actions: {
                getPostsForPage: jest.fn(),
                createNewPost: jest.fn(),
                createError: jest.fn(),
                showComments: jest.fn()
            }
        };
        const component = renderer.create(
            <Provider store={store}>
                <Home {...props} />
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
