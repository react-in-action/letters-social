jest.mock('mapbox');
import React from 'react';
import renderer from 'react-test-renderer';

import { Home } from '../../src/pages/home';

const now = new Date().getTime();
describe('Single post page', () => {
    test('should render posts', function() {
        const props = {
            posts: [
                { id: 1, content: 'stuff', likes: [], date: now },
                { id: 2, content: 'stuff', likes: [], date: now }
            ],
            actions: {
                getPostsForPage: jest.fn(),
                createNewPost: jest.fn(),
                createError: jest.fn(),
                showComments: jest.fn()
            }
        };
        const component = renderer.create(<Home {...props} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
