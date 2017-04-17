import React from 'react';
import renderer from 'react-test-renderer';

import { App } from './App';

describe('<App/>', () => {
    it('should render correctly', () => {
        const component = renderer.create(<App />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('should have the right classname and element type', () => {
        const component = renderer.create(<App />);
        const tree = component.toJSON();
        expect(tree.props.className).toBe('app');
        expect(tree.type).toBe('div');
    });
    it('should have at at least navbar and router output children', () => {
        const component = renderer.create(<App />);
        const tree = component.toJSON();
        expect(tree.children.length).toBeGreaterThanOrEqual(2);
        expect(tree).toMatchSnapshot();
    });
});
