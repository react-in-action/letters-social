import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createError } from '../actions/error';
import { createNewPost, getPostsForPage } from '../actions/posts';
import { showComments } from '../actions/comments';
import Ad from '../components/ad/Ad';
import CreatePost from '../components/post/Create';
import Post from '../components/post/Post';
import Welcome from '../components/welcome/Welcome';

class Home extends Component {
    componentDidMount() {
        this.props.actions.getPostsForPage();
    }
    componentDidCatch(err, info) {
        this.props.actions.createError(err, info);
    }
    render() {
        return (
            <div className="home">
                <Welcome />
                <div>
                    <CreatePost onSubmit={this.props.actions.createNewPost} />
                    {this.props.posts && (
                        <div className="posts">
                            {this.props.posts.map(post => (
                                <Post
                                    key={post.id}
                                    post={post}
                                    openCommentsDrawer={this.props.actions.showComments}
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
    posts: PropTypes.arrayOf(PropTypes.object)
};
export const mapStateToProps = state => {
    const posts = state.postIds
        .map(postId => state.posts[postId])
        .sort((a, b) => new Date(a.date) < new Date(b.date));
    return {
        posts,
        loading: state.loading
    };
};
export const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                createNewPost,
                getPostsForPage,
                showComments,
                createError,
                getNextPageOfPosts: getPostsForPage.bind(this, 'next')
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
