import React from 'react';
import renderer from 'react-test-renderer';

import DisplayMap from '../../../src/components/map/DisplayMap';

describe('DisplayMap', () => {
    test('snapshot', () => {
        const props = {
            onLocationSelect: jest.fn(),
            onLocationUpdate: jest.fn()
        };
        const component = renderer.create(<DisplayMap {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
