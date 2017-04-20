import React from 'react';
import renderer from 'react-test-renderer';

import Navigation from '../../../src/components/nav/Navbar';

describe('<Navigation/>', () => {
    it('should render correctly', () => {
        const component = renderer.create(<Navigation />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('should show a login option with user state', () => {
        const component = renderer.create(<Navigation />);
        const tree = component.toJSON();

        expect(tree.type).toBe('nav');
        expect(tree).toMatchSnapshot();
    });
});
