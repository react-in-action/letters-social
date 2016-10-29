// import React from 'react';
// import renderer from 'react-test-renderer';
//
// import { SinglePost } from './Post';

xit('SinglePost should render correctly', () => {
  const component = renderer.create(<SinglePost />);
  const tree = component.toJSON();
  console.log(tree);
});
