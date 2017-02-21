import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
const sinon = require('sinon');
import configureStore from '../store/configureStore';

const store = configureStore();

jest.mock('../shared/http');
import { Post } from '../components/post';
import { Home } from './Home';

describe('<Home/>', () => {
  describe('lifecycle methods', () => {
    const componentDidMountStub = sinon.stub(Home.prototype, 'componentDidMount');
    mount(
        <Provider store={store}>
            <Home />
        </Provider>
    );
    expect(componentDidMountStub.calledOnce).toBe(true);
  });

  describe('render methods', () => {
    it('should render posts', async () => {
      const wrapper = mount(
          <Provider store={store}>
              <Home />
          </Provider>
      );
      expect(wrapper.find(Post).length).toBe(0);
    });
    it('should render', () => {
      const wrapper = mount(
          <Provider store={store}>
              <Home />
          </Provider>
      );
      expect(wrapper.find('.home').length).toBe(1);
    });
  });
});
