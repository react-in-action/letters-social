// @flow

import React from 'react';
import Nav from './nav/navbar';
import { Col, Grid, Row } from 'react-bootstrap';
import './styles/styles.scss';

export class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="app">
        <Nav />
        <Grid fluid>
          <Row>
            <Col sm={6} md={10}>
              app content!
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
