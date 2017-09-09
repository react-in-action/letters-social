import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadPost } from '../actions/posts';
import Ad from '../components/ad/Ad';
import Post from '../components/post/Post';
import Link from '../components/router/Link';
import Loader from '../components/Loader';

/**
 * Component for a single post
 * @module letters/components
 * @type {Object}
 */
class SinglePost extends Component {
    static propTypes = {
        params: PropTypes.shape({
            post: PropTypes.string
        })
    };
    componentDidMount() {
        // If we don't have a post yet, dispatch an action to load it
        if (!this.props.post) {
            this.props.actions.loadPost(this.props.router.params.postId);
        }
    }
    render() {
        return this.props.post ? (
            <div className="single-post">
                <Link to="/">
                    <div className="back">
                        <i className="fa fa-arrow-left" /> Back
                    </div>
                </Link>
                <Post post={this.props.post} />
                <Ad
                    url="https://www.manning.com/books/react-in-action"
                    imageUrl="https://s3-us-west-2.amazonaws.com/react-sh/assets/ads/react+in+action+meap+ad.png"
                />
            </div>
        ) : (
            <Loader />
        );
    }
}

export default connect(
    // mapStateToProps
    (state, ownProps) => {
        console.log(ownProps);
        return {
            // try to directly read the post from our store and only fetch all posts in
            // componentDidMount if we have to
            post: state.posts[ownProps.params.postId]
        };
    },
    dispatch => {
        return {
            actions: bindActionCreators({ loadPost }, dispatch)
        };
    }
)(SinglePost);
