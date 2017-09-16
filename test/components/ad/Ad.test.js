import React from 'react';
import Ad from '../../../src/components/ad/Ad';
import renderer from 'react-test-renderer';

describe('<Ad/>', () => {
    test('should render correctly', () => {
        const component = renderer.create(<Ad />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('should display a link', () => {
        const expectedUrl = 'https://ifelse.io/book';
        const expectedImageURL = '/static/assets/ads/orly.jpg';
        const component = renderer.create(<Ad url={expectedUrl} imageUrl={expectedImageURL} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('should display an image', () => {
        const expectedUrl = 'https://ifelse.io/book';
        const expectedImageURL = '/static/assets/ads/ria.png';
        const component = renderer.create(<Ad url={expectedUrl} imageUrl={expectedImageURL} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
