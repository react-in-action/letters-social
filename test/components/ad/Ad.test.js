import React from 'react';
import { Ad } from './Ad';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

jest.dontMock('./Ad');
describe('<Ad/>', () => {
    it('should render correctly', () => {
        const component = renderer.create(<Ad />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('should display a link', () => {
        const expectedUrl = 'https://ifelse.io/book';
        const expectedImageURL =
            'https://drtzvj8zd0k9x.cloudfront.net/assets/ads/react+in+action+meap+ad.png';
        const component = shallow(
            <Ad url={expectedUrl} imageUrl={expectedImageURL} />
        );
        expect(component.find('a').props().href).toBe(expectedUrl);
    });
    it('should display an image', () => {
        const expectedUrl = 'https://ifelse.io/book';
        const expectedImageURL =
            'https://drtzvj8zd0k9x.cloudfront.net/assets/ads/react+in+action+meap+ad.png';
        const component = shallow(
            <Ad url={expectedUrl} imageUrl={expectedImageURL} />
        );
        expect(component.find('img').props().src).toBe(expectedImageURL);
    });
});
