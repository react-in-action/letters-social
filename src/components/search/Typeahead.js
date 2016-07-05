import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import { debounce } from 'lodash';

class Typeahead extends React.Component {
  static propTypes = {
    expanded: PropTypes.bool,
  }
  static defaultProps = {
    expanded: false,
  }
  constructor(props) {
    // Set initial state
    super(props);
    this.state = {
      query: null,
      expanded: this.props.expanded,
    };

    // Bind methods
    // this.expand = this.expand.bind(this);
  }
  expand() {
    // this.setState({
    //   expanded: !this.state.expanded,
    // });
    // if (this.state.expanded) {
    //   this.setState({
    //     typeaheadWidth: 300,
    //   });
    // } else {
    //
    // }
    console.log('hi!');
  }

  search(query: string) {
    if (!query) {
      return;
    }
    // debounce();
    fetch(`${process.env.ENDPOINT}?q=${query}`)
      .then(res => res.json())
      .then(jsonRes => console.log(jsonRes));
  }

  render() {
    return (
      <div className="typeahead">
        <form action="/" className="form-inline pull-right pull-xs-right">
          <input
            onFocus={this.expand.bind(this)}
            type="text"
            placeholder="Search..."
          />
        </form>
      </div>
    );
  }
}

export default Typeahead;
