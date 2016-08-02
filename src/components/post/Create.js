import React, { PropTypes } from 'react';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    // Set up state
    this.state = {
      content: '',
    };

    // Set up event handlers
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);
  }

  handlePostChange(event) {
    const content = event.target.value;
    this.setState({ content });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.content.length <= 0) {
      return;
    }
    if (this.props.onSubmit) {
      const newPost = {
        content: this.state.content,
      };
      this.props.onSubmit(newPost);
      this.setState({
        content: '',
      });
    }
  }

  render() {
    return (
      <form className="create-post" onSubmit={this.handleSubmit}>
        <textarea value={this.state.content} onChange={this.handlePostChange} placeholder="What's on your mind?" />
        <button className="btn btn-default">Post</button>
      </form>
    );
  }
}

CreatePost.propTypes = {
  onSubmit: PropTypes.func,
};

export default CreatePost;
