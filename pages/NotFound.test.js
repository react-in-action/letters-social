import React from 'react';
import renderer from 'react-test-renderer';

import { NotFound } from './NotFound';

test('NotFound should render correctly', () => {
    const component = renderer.create(<NotFound />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
