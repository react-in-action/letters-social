import test from 'ava';
import { App } from '../../src/components/App';
import { shallow } from 'enzyme';

test('app', t => {
  const wrapper = shallow(<App />);
  t.true(wrapper.hasClass('Foo'));
});

test('renders two `.Bar`', t => {
  const wrapper = shallow(<Foo />);
  t.is(wrapper.find('.bar').length, 2);
});

test('renders children when passed in', t => {
  const wrapper = shallow(
        <Foo>
            <div className="unique" />
        </Foo>
    );
  t.true(wrapper.contains(<div className="unique" />));
});
