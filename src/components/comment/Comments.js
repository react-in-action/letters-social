import PropTypes from 'prop-types';
import React from 'react';
import Comment from './Comment';
import CreateComment from './Create';

export default class Comments extends React.Component {
    static propTypes = {
        post: PropTypes.object,
        forceOpen: PropTypes.bool
    };

    constructor(props) {
        super(props);
        // Bind methods
        this.toggle = this.toggle.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

        // initialize state
        this.state = {
            comments: [],
            showComments: false,
            commentsLoaded: false
        };
    }

    componentDidMount() {
        if (this.props.forceOpen) {
            this.toggle();
        }
    }

    handleCommentSubmit(id) {
        console.log('Thread id: ', id);
    }

    toggle() {
        this.setState({
            showComments: !this.state.showComments
        });
    }

    render() {
        const { post } = this.props;
        return (
            <div className="comments">
                {this.state.showComments && post.comments.length > 0
                    ? post.comments.map(comment => (
                          <Comment key={comment.id} comment={comment} />
                      ))
                    : null}
                {this.state.showComments
                    ? <CreateComment
                          handleSubmit={this.handleCommentSubmit}
                          threadID={post.id}
                      />
                    : null}
                {post.comments.length > 0
                    ? <button
                          onClick={this.toggle}
                          className="btn btn-default pull-right"
                      >
                          <i
                              className={`fa ${this.state.showComments ? 'fa-angle-up' : 'fa-angle-down'}`}
                          />
                      </button>
                    : null}
            </div>
        );
    }
}
