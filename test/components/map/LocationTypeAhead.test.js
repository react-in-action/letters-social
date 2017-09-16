jest.mock('mapbox');
import React from 'react';
import renderer from 'react-test-renderer';

import LocationTypeAhead from '../../../src/components/map/LocationTypeAhead';

describe('LocationTypeAhead', () => {
    test('snapshot', () => {
        const props = {
            onLocationSelect: jest.fn(),
            onLocationUpdate: jest.fn()
        };
        const component = renderer.create(<LocationTypeAhead {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
