jest.mock('mapbox');
import React from 'react';
import renderer from 'react-test-renderer';

import CreatePost from '../../../src/components/post/Create';

describe('CreatePost', () => {
    test('snapshot', () => {
        const props = { onSubmit: jest.fn() };
        const component = renderer.create(<CreatePost {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('handlePostChange', () => {
        const props = { onSubmit: jest.fn() };
        const mockEvent = { target: { value: 'value' } };
        CreatePost.prototype.setState = jest.fn();
        const component = new CreatePost(props);
        component.handlePostChange(mockEvent);
        expect(component.setState).toHaveBeenCalled();
    });
    test('handleRemoveLocation', () => {
        const props = { onSubmit: jest.fn() };
        CreatePost.prototype.setState = jest.fn();
        const component = new CreatePost(props);
        component.handleRemoveLocation();
        expect(component.setState).toHaveBeenCalled();
    });
    test('handleSubmit', () => {
        const props = { onSubmit: jest.fn() };
        const mockEvent = {
            target: { value: 'value' },
            preventDefault: jest.fn()
        };
        CreatePost.prototype.setState = jest.fn();
        const component = new CreatePost(props);
        component.state = {
            valid: true,
            content: 'content',
            location: 'place',
            locationSelected: true
        };
        component.handleSubmit(mockEvent);
        expect(component.setState).toHaveBeenCalled();
        expect(props.onSubmit).toHaveBeenCalledWith({
            content: 'content',
            location: 'place'
        });
    });
    test('onLocationUpdate', () => {
        const props = { onSubmit: jest.fn() };
        CreatePost.prototype.setState = jest.fn();
        const component = new CreatePost(props);
        component.onLocationUpdate({});
        expect(component.setState).toHaveBeenCalled();
    });
    test('handleToggleLocation', () => {
        const props = { onSubmit: jest.fn() };
        const mockEvent = {
            preventDefault: jest.fn()
        };
        CreatePost.prototype.setState = jest.fn();
        const component = new CreatePost(props);
        component.handleToggleLocation(mockEvent);
        expect(component.setState).toHaveBeenCalled();
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
    test('onLocationSelect', () => {
        const props = { onSubmit: jest.fn() };
        CreatePost.prototype.setState = jest.fn();
        const component = new CreatePost(props);
        component.onLocationSelect('location');
        expect(component.setState).toHaveBeenCalled();
    });
    test('renderLocationControls', () => {
        const props = { onSubmit: jest.fn() };
        const component = renderer.create(<CreatePost {...props} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
