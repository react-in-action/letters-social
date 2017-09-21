jest.mock('../../src/shared/http');

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import { SinglePost, mapStateToProps, mapDispatchToProps } from '../../src/pages/post';
import configureStore from '../../src/store/configureStore';
import initialState from '../../src/constants/initialState';
describe('Single post page', () => {
    const state = Object.assign({}, initialState, {
        posts: {
            1: { content: 'stuff', likes: [] }
        },
        postIds: [1]
    });
    const store = configureStore(state);
    test('mapStateToProps', () => {
        const ownProps = {
            params: {
                postId: 1
            }
        };
        expect(mapStateToProps(state, ownProps)).toEqual({
            post: state.posts[ownProps.params.postId]
        });
    });
    test('mapDispatchToProps', () => {
        const dispatchStub = jest.fn();
        const mappedDispatch = mapDispatchToProps(dispatchStub);
        expect(mappedDispatch.actions.loadPost).toBeDefined();
        mappedDispatch.actions.loadPost();
        expect(dispatchStub).toHaveBeenCalled();
    });

    test('should render the right components', () => {
        const mockPost = {
            id: 'id',
            content: 'content'
        };
        const component = shallow(<SinglePost post={mockPost} />);
        expect(component.find('Link').length).toEqual(1);
        expect(component.find('Post').length).toEqual(1);
        expect(component.find('Ad').length).toEqual(1);
    });
    test('should render a loader when no post loaded', () => {
        const props = {
            post: null,
            actions: { loadPost: jest.fn() },
            router: { params: { postId: 1 } }
        };
        const component = shallow(<SinglePost {...props} />);
        expect(component.find('Loader').length).toEqual(1);
    });
    test('should load a component if one is not already loaded', function() {
        const props = {
            post: null,
            actions: { loadPost: jest.fn() },
            router: { params: { postId: 1 } }
        };
        const component = renderer.create(
            <Provider store={store}>
                <SinglePost {...props} />
            </Provider>
        );
        let tree = component.toJSON();
        expect(props.actions.loadPost).toHaveBeenCalled();
        expect(tree).toMatchSnapshot();
    });
    test('should reuse an already loaded post', function() {
        const props = {
            post: {
                id: 1,
                likes: []
            },
            actions: { loadPost: jest.fn() },
            router: { params: { postId: 1 } }
        };
        const component = renderer.create(
            <Provider store={store}>
                <SinglePost {...props} />
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        expect(props.actions.loadPost.mock.calls.length).toEqual(0);
    });
});
