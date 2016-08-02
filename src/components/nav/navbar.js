import React from 'react';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import Logo from './logo';

const Nav = () => {
  return (
    <Navbar fluid fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Logo logoOnly={false} />
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
};

export default Nav;
