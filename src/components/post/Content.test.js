import React from 'react';
import { shallow } from 'enzyme';

import { Content } from './Content';

describe('<Content/>', () => {
  describe('render methods', () =>  {
    it('should render correctly', () =>  {
      const mockPost = {
        content: 'I am learning to test React components',
      };
      const wrapper = shallow(<Content post={mockPost} />);
      expect(wrapper.find('p').length).toBe(1);
      expect(wrapper.find('p.content').length).toBe(1);
      expect(wrapper.find('.content').text()).toBe(mockPost.content);
      expect(wrapper.find('p').text()).toBe(mockPost.content);
    });
  });
});
