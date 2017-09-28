import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Content from '../../../src/components/post/Content';

describe('<Content/>', () => {
    test('should render correctly', () => {
        const mockPost = {
            content: 'I am learning to test React components'
        };
        const wrapper = shallow(<Content post={mockPost} />);
        expect(wrapper.find('p').length).toBe(1);
        expect(wrapper.find('p.content').length).toBe(1);
        expect(wrapper.find('.content').text()).toBe(mockPost.content);
        expect(wrapper.find('p').text()).toBe(mockPost.content);
    });

    test('snapshot', () => {
        const mockPost = {
            content: 'I am learning to test React components'
        };
        const component = renderer.create(<Content post={mockPost} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
