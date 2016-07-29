import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    // Set up state
    this.state = {
      text: '',
    };

    // Set up event handlers
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);
  }

  handlePostChange(event) {
    this.setState({
      text: event.target.value.trim(),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitting');
    console.log(event.target);
  }

  render() {
    return (
      <form className="create-post" onSubmit={this.handleSubmit}>
        {this.state.text}
        <textarea onChange={this.update} placeholder="What's on your mind?" />
        <button className="btn btn-default">Post</button>
      </form>
    );
  }
}

CreatePost.propTypes = {
  onCreatePost: PropTypes.func,
};

export default CreatePost;
