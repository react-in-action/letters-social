import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createNewPost, getPostsForPage } from '../actions/posts';
import Ad from '../components/ad/Ad';
import CreatePost from '../components/post/Create';
import Post from '../components/post/Post';
import Welcome from '../components/welcome/Welcome';

class Home extends Component {
    componentDidMount() {
        this.props.actions.getPostsForPage();
    }
    render() {
        const posts = [];
        for (let postId of this.props.postIds) {
            posts.push(<Post key={postId} post={this.props.posts[postId]} />);
        }
        return (
            <div className="home">
                <Welcome />
                <div>
                    <CreatePost onSubmit={this.props.actions.createNewPost} />
                    {this.props.posts && <div className="posts">{posts}</div>}
                    <button className="block" onClick={this.props.actions.getNextPageOfPosts}>
                        Load more posts
                    </button>
                </div>
                <div>
                    <Ad
                        url="https://ifelse.io/book"
                        imageUrl="https://drtzvj8zd0k9x.cloudfront.net/assets/ads/react+in+action+meap+ad.png"
                    />

                    <Ad
                        url="https://ifelse.io/book"
                        imageUrl="https://drtzvj8zd0k9x.cloudfront.net/assets/ads/Yl48tQw.jpg"
                    />
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    posts: PropTypes.object,
    postIds: PropTypes.object
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
                        getPostsForPage('next');
                    }
                },
                dispatch
            )
        };
    }
)(Home);

export default HomeContainer;
