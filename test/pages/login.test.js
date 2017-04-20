import React from 'react';
import renderer from 'react-test-renderer';

import Login from '../../src/pages/login';

describe('<Login/>', () => {
    it('Login should render correctly', () => {
        const component = renderer.create(<Login />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
