import React from 'react';
import renderer from 'react-test-renderer';

import Comment from '../../../src/components/comment/Comment';

describe('<Comment/>', () => {
    test('should render correctly', () => {
        const mockComment = {
            id: 'id',
            content: 'content',
            user: {
                name: 'mark',
                profilePicture: 'profilePicture'
            },
            date: new Date().getTime(),
            likes: 10
        };
        const component = renderer.create(<Comment comment={mockComment} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
