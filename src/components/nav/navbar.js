import React from 'react';
import { Navbar } from 'react-bootstrap';
import Logo from './logo';

const Nav = () => {
  return (
    <Navbar fluid fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Logo center />
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
};

export default Nav;
