import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { Post as postModel } from '../../db/models';
import SinglePost from '../../src/pages/post';
import Link from '../../src/components/router/Link';
import Post from '../../src/components/post/Post';

jest.dontMock('react-overlays');
jest.mock('../../src/shared/http');
describe('<SinglePost/>', () => {
    let postModelStub;
    beforeEach(() => {
        postModelStub = new postModel();
    });

    describe('render methods', () => {
        it('should render a Post', () => {
            const wrapper = shallow(
                <SinglePost params={{ post: postModelStub.id }} />
            );
            wrapper.setState({ post: postModelStub });
            expect(wrapper.find(Post).length).toBe(1);
            expect(wrapper.find(Link).length).toBe(1);
        });

        it('renders', () => {
            const component = renderer.create(
                <SinglePost params={{ post: postModelStub.id }} />
            );
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
