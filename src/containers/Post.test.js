import React from 'react';
import renderer from 'react-test-renderer';

import { SinglePost } from './Post';

test('SinglePost should render correctly', () => {
  const component = renderer.create(
    <SinglePost />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
