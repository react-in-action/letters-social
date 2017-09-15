import React from 'react';
import Loader from '../src/components/Loader';
import renderer from 'react-test-renderer';

test('Loader', () => {
    const component = renderer.create(<Loader />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
