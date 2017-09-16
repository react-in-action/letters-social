import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import initialState from '../../../src/constants/initialState';
import configureStore from '../../../src/store/configureStore';
import Navigation from '../../../src/components/nav/navbar';

describe('Navigation', () => {
    test('should render with a user', () => {
        const state = Object.assign({}, initialState, {
            user: {
                name: 'name',
                authenticated: true,
                profilePicture: 'pic',
                id: 1
            }
        });
        const store = configureStore(state);
        const component = renderer.create(
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('should render without user', () => {
        const store = configureStore();
        const component = renderer.create(
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree.type).toBe('nav');
        expect(tree).toMatchSnapshot();
    });
});
