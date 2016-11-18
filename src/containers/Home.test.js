import React from 'react';
import { shallow, mount } from 'enzyme';
import { Post } from '../components/post';
import sinon from 'sinon';

import { fetchPosts } from '../shared/http';

jest.mock('../shared/http');
// jest.dontMock('./Home');
import { Home } from './Home';



describe('<Home/>', () => {
  it('calls componentDidMount', () => {
    sinon.spy(Home.prototype, 'componentDidMount');
    mount(<Home />);
    expect(Home.prototype.componentDidMount.calledOnce).toBe(true);
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('.home').length).toBe(1);
  });

  it('should render posts', () => {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('.home').length).toBe(1);
  });

  it('should let you load more posts', () =>  {
    sinon.spy(Home.prototype, 'loadMorePosts');
    const wrapper = mount(<Home/>);
    wrapper.find('.load-more').simulate('click');
    expect(Home.prototype.loadMorePosts.calledOnce).toBe(true);
  });

  it('should display posts', async () => {
    const wrapper = mount(<Home/>);
    const posts = await fetchPosts(5);
    wrapper.setState({ loaded: true, posts });
    expect(wrapper.find(Post).length).toBe(5);
  });
});
