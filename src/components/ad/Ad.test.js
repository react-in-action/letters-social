jest.mock('react-dom');
import renderer from 'react-test-renderer';
import React from 'react';
import { Ad } from './Ad';

describe('<Ad/>', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Ad />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
