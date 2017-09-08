import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createNewPost, getPostsForPage } from '../actions/posts';
import { showComments } from '../actions/comments';
import Ad from '../components/ad/Ad';
import CreatePost from '../components/post/Create';
import Post from '../components/post/Post';
import Welcome from '../components/welcome/Welcome';

class Home extends Component {
    componentDidMount() {
        this.props.actions.getPostsForPage('first');
    }
    render() {
        return (
            <div className="home">
                <Welcome />
                <div>
                    <CreatePost onSubmit={this.props.actions.createNewPost} />
                    {this.props.posts && (
                        <div className="posts">
                            {this.props.postIds.map(postId => (
                                <Post
                                    key={postId}
                                    post={this.props.posts[postId]}
                                    openCommentsDrawer={this.props.actions.openCommentsDrawer}
                                />
                            ))}
                        </div>
                    )}
                    <button className="block" onClick={this.props.actions.getNextPageOfPosts}>
                        Load more posts
                    </button>
                </div>
                <div>
                    <Ad
                        url="https://ifelse.io/book"
                        imageUrl="https://s3-us-west-2.amazonaws.com/react-sh/assets/ads/react+in+action+meap+ad.png"
                    />

                    <Ad
                        url="https://ifelse.io/book"
                        imageUrl="https://s3-us-west-2.amazonaws.com/react-sh/assets/ads/Yl48tQw.jpg"
                    />
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    posts: PropTypes.object,
    postIds: PropTypes.arrayOf(PropTypes.string)
};

const HomeContainer = connect(
    // mapStateToProps
    state => {
        return {
            posts: state.posts,
            postIds: state.postIds,
            loading: state.loading
        };
    },
    dispatch => {
        return {
            actions: bindActionCreators(
                {
                    createNewPost,
                    getPostsForPage,
                    getNextPageOfPosts() {
                        dispatch(getPostsForPage('next'));
                    },
                    openCommentsDrawer() {
                        dispatch(showComments());
                    }
                },
                dispatch
            )
        };
    }
)(Home);

export default HomeContainer;
