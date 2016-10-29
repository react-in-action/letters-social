import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { Ad } from './Ad';

describe('<Ad/>', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Ad />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('should render an image', () => {
    const wrapper = shallow(<Ad />);
  });
});
