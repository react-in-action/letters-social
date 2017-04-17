import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import Comment from './Comment';

describe('<Comment/>', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should render correctly', () => {
        const mockComment = {
            id: 'id',
            content: 'content',
            user: {
                firstName: 'mark',
                profilePicture: 'profilePicture',
                lastName: 'thomas'
            },
            date: new Date().toISOString(),
            likes: 10
        };
        const component = renderer.create(<Comment comment={mockComment} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
