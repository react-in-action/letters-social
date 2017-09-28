import React from 'react';
import renderer from 'react-test-renderer';

import Navigation from '../../../src/components/nav/navbar';

describe('Navigation', () => {
    test('snapshot, no user', () => {
        const mockUser = { authenticated: false, profilePicture: '', name: '' };
        const component = renderer.create(<Navigation handleLogout={jest.fn()} user={mockUser} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('snapshot, user', () => {
        const mockUser = { authenticated: true, profilePicture: 'url', name: 'mark' };
        const component = renderer.create(<Navigation handleLogout={jest.fn()} user={mockUser} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
