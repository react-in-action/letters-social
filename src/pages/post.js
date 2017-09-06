import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPostByID, getPostsForPage } from '../actions/posts';
import Ad from '../components/ad/Ad';
import Post from '../components/post/Post';
import Link from '../components/router/Link';
import Loader from '../components/Loader';

class SinglePost extends Component {
    static propTypes = {
        params: PropTypes.shape({
            post: PropTypes.string
        })
    };

    componentDidMount() {
        // If there's no posts already loaded, load them
        if (!this.props.post) {
            this.props.actions.getPostByID(this.props.router.params.postId);
        }
    }

    render() {
        return this.props.post ? (
            <div className="single-post">
                <Link to="/">
                    <span>
                        <i className="fa fa-arrow-left" /> Back
                    </span>
                </Link>
                <Post openCommentsDrawer post={this.props.post} />
                <Ad
                    url="https://www.manning.com/books/react-in-action"
                    imageUrl="https://drtzvj8zd0k9x.cloudfront.net/assets/ads/react+in+action+meap+ad.png"
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
        return {
            // try to directly read the post from our store and only fetch all posts in
            // componentDidMount if we have to
            post: state.posts[ownProps.router.params.post]
        };
    },
    dispatch => {
        return {
            actions: bindActionCreators({ getPostByID, getPostsForPage }, dispatch)
        };
    }
)(SinglePost);
