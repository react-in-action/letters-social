import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { fetchPosts } from '../shared/http';

jest.mock('../shared/http');
import { Posts } from '../components/post';
import { Home } from './Home';


describe('<Home/>', () => {
  describe('lifecycle methods', () => {
    sinon.spy(Home.prototype, 'componentDidMount');
    mount(<Home />);
    expect(Home.prototype.componentDidMount.calledOnce).toBe(true);
  });

  describe('event methods', () => {
    it('should let you load more posts', () =>  {
      sinon.spy(Home.prototype, 'loadMorePosts');
      const wrapper = shallow(<Home/>);
      wrapper.find('.load-more').simulate('click');
      expect(Home.prototype.loadMorePosts.calledOnce).toBe(true);
    });
  });
  describe('custom methods', () => {

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
    it('should render posts', () => {
      const wrapper = shallow(<Home/>);
      expect(wrapper.find('.home').length).toBe(1);
    });
  });
  it('calls componentDidMount', () => {
    // sinon.spy(Home.prototype, 'componentDidMount');
    // const wrapper = mount(<Home />);
    // console.log(Home.prototype.componentDidMount);
    // expect(Home.prototype.componentDidMount.calledOnce).toBe(true);
  });
});
