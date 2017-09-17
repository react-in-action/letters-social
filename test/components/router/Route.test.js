import React from 'react';
import { shallow } from 'enzyme';

import Route from '../../../src/components/router/Route';

describe('Route', () => {
    test('should require a path', () => {
        expect(() => shallow(<Route />)).toThrow();
    });
});
