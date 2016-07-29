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
      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl type="text" placeholder="Search" />
          </FormGroup>
          {' '}
          <Button type="submit">Submit</Button>
        </Navbar.Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
