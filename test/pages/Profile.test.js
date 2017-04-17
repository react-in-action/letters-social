import React from 'react';
import renderer from 'react-test-renderer';

import { Profile } from './Profile';

test('Profile should render correctly', () => {
    const component = renderer.create(<Profile />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
