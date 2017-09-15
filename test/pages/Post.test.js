jest.mock('../../src/shared/http');

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import { Post as postModel } from '../../db/models';
import SinglePost, { mapStateToProps, mapDispatchToProps } from '../../src/pages/post';
import Link from '../../src/components/router/Link';
import Post from '../../src/components/post/Post';
import configureStore from '../../src/store/configureStore';

function createContainer(component, store) {
    return shallow(<Provider store={store}>{component}</Provider>);
}

describe('Single post page', () => {
    let postModelStub;
    let container;
    let store;
    beforeEach(() => {
        postModelStub = new postModel({ name: 'name' });
    });

    describe('container', function() {
        it('mapStateToProps', function() {
            const state = {
                posts: {
                    1: {
                        content: 'stuff'
                    }
                }
            };
            const ownProps = {
                params: {
                    postId: 1
                }
            };
            expect(mapStateToProps(state, ownProps)).toEqual({
                post: { content: 'stuff' }
            });
        });
        it('mapDispatchToProps', function() {
            const dispatchStub = jest.fn();
            const mappedDispatch = mapDispatchToProps(dispatchStub);
            expect(mappedDispatch.actions.loadPost).toBeDefined();
            mappedDispatch.actions.loadPost();
            expect(dispatchStub).toHaveBeenCalled();
        });
    });

    describe('render methods', () => {
        it('should render the right components', function() {
            const store = configureStore();
            container = createContainer(<SinglePost />, store);
            expect(container.find('Post').length).toEqual(1);
        });
        it('should render a Post', () => {
            const component = renderer.create(<SinglePost params={{ post: postModelStub.id }} />);
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('renders', () => {
            const component = renderer.create(<SinglePost params={{ post: postModelStub.id }} />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
