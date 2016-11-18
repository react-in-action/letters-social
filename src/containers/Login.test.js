import React from 'react';
import renderer from 'react-test-renderer';

import { Login } from './Login';

describe('<Login/>', () => {
  it('Login should render correctly', () => {
    const component = renderer.create(<Login />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should ', function () {

  });
});
