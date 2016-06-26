import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Letter from './Letter';

class Welcome extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);
    this.showLetter = this.showLetter.bind(this);
  }
  state = {
    showLetter: false,
  }
  showLetter() {
    this.setState({
      showLetter: true,
    });
  }
  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header closeButton onClose={this.props.onClose}>
          <Modal.Title>Welcome!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            If you're here, you're probably reading <em>React in Action</em> by, well,
            me (<a href="https://github.com/markthethomas">@markthethomas</a>) 😀!
            I hope you're enjoying learning about React so far! We'll be working
            through each part of the project as we move through
            it in the book, but you can find the complete project here for reference.
            If you have any questions or thoughts, feel free to reach out to me
            @markthethomas (
            <a href="https://ifelse.io"><i className="fa fa-pencil"></i></a>
            <a href="https://twitter.com/MarkTheThomas"><i className="fa fa-twitter"></i></a>
            <a href="https://github.com/markthethomas"><i className="fa fa-github"></i></a>
            ) pretty much anywhere.
          </p>

          <p>
            - Mark
          </p>


          <br />
          <p>
            How to get started:
            <ul>
              <li>
                install project using <code>npm install</code>
              </li>
              <li>
                read welcome letter from Letters (see below)
              </li>
              <li>
                read along in React in Action
              </li>
            </ul>
          </p>

          <br />
          {
            this.state.showLetter ?
              null
              :
              <Button
                block
                bsStyle="success"
                onClick={this.showLetter}
              > Read welcome letter <i className="fa fa-check"></i>
              </Button>
          }

          <br />
          <Letter show={this.state.showLetter} />
        </Modal.Body>
        <Modal.Footer>
          {
            this.state.showLetter ?
              <Button
                block
                onClick={this.props.onClose}
              >
                Get started
              </Button>
              :
              null
          }
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Welcome;
