import React from 'react';
import renderer from 'react-test-renderer';

import initialState from '../../src/constants/initialState';
import { Login, mapStateToProps, mapDispatchToProps } from '../../src/pages/login';

describe('Login', () => {
    test('Login should render correctly', () => {
        const props = { handleLogin: jest.fn() };
        const component = renderer.create(<Login {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('mapStateToProps', () => {
        const actual = mapStateToProps(initialState);
        const expected = Object.assign({}, initialState);
        expect(actual).toEqual(expected);
    });
    test('mapStateToProps', () => {
        const mockDispatch = jest.fn();
        const dispatch = mapDispatchToProps(mockDispatch);
        expect(dispatch.handleLogin).toBeDefined();
        dispatch.handleLogin('github');
        expect(mockDispatch).toHaveBeenCalled();
    });
});
