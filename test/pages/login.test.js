import React from 'react';
import renderer from 'react-test-renderer';

import { Login } from '../../src/pages/login';

describe('Login', () => {
    test('Login should render correctly', () => {
        const props = { handleLogin: jest.fn() };
        const component = renderer.create(<Login {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
