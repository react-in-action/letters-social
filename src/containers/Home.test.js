import React from 'react';
import { shallow, mount } from 'enzyme';
const sinon = require('sinon');

import { fetchPosts } from '../shared/http';

jest.mock('../shared/http');
import { Posts } from '../components/post';
import { Home } from './Home';

describe('<Home/>', () => {
  describe('lifecycle methods', () => {
    const componentDidMountStub = sinon.stub(Home.prototype, 'componentDidMount');
    mount(<Home />);
    expect(componentDidMountStub.calledOnce).toBe(true);
  });

  describe('event methods', () => {
    it('should let you load more posts', () =>  {
      const loadMorePostsStub = sinon.stub(Home.prototype, 'loadMorePosts');
      const wrapper = shallow(<Home/>);
      wrapper.find('.load-more').simulate('click');
      expect(loadMorePostsStub.calledOnce).toBe(true);
    });
  });

  describe('render methods', () => {
    it('should render posts', async () => {
      const posts = await fetchPosts();
      const wrapper = shallow(<Home/>);
      wrapper.setState({ loaded: true, posts });
      expect(wrapper.find(Posts).length).toBe(1);
    });
    it('should render', () => {
      const wrapper = shallow(<Home/>);
      expect(wrapper.find('.home').length).toBe(1);
    });
  });
});
