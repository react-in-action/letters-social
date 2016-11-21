import React from 'react';
import { shallow } from 'enzyme';

import { Link } from './Link';

describe('<Link/>', () => {
  const baseProps = {
    link: {
      url: 'https://ifelse.io',
      title: 'A Link',
      description: 'This is a link!',
    },
  };
  describe('render methods', () => {
    it('should render nothing without a link', () => {
      const wrapper = shallow(<Link />);
      expect(wrapper.html()).toBeFalsy();
    });
    it('should render properly ', () => {
      const wrapper = shallow(<Link link={baseProps.link} />);
      expect(wrapper.find('.url').text()).toBe('https://ifelse.io');
    });
  });
});
