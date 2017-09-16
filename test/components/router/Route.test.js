import React from 'react';
import renderer from 'react-test-renderer';

import Route from '../../../src/components/router/Route';

describe('Route', () => {
    test('should require a path', () => {
        expect(() => renderer.create(<Route />)).toThrow();
    });
});
