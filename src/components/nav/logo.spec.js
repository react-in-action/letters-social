import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import Logo from './logo';

test('<Logo/>', t => {
  const wrapper = shallow(<Logo />);
  console.log(wrapper);
  t.pass();
});

test(':props:default', t => {
  const wrapper = shallow(<Logo />);
  t.pass();
});

test(':props:default', t => {
  const wrapper = shallow(<Logo />);
  t.pass();
});
