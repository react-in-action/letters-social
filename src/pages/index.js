import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createNewPost, getPosts } from '../actions/posts';
import { AutoAffix } from 'react-overlays';
import Ad from '../components/ad/Ad';
import CreatePost from '../components/post/Create';
import Post from '../components/post/Post';
import Welcome from '../components/welcome/Welcome';

class Home extends Component {
    componentDidMount() {
        this.props.actions.getPosts();
    }
    render() {
        return (
            <div className="home">
                <div className="row">
                    <div className="col-xs-3 hidden-xs">
                        <Welcome />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <CreatePost
                            onSubmit={this.props.actions.createNewPost}
                        />
                        {this.props.posts &&
                            <div className="posts">
                                {this.props.postIds.map(postId => {
                                    return (
                                        <Post
                                            key={postId}
                                            post={this.props.posts[postId]}
                                        />
                                    );
                                })}
                            </div>}
                        <button
                            className="load-more text-center btn-lg btn btn-default btn-block"
                            onClick={this.props.actions.getPosts}
                        >
                            Load more posts
                        </button>
                    </div>
                    <div className="col-sm-2 col-xs-12 hidden-xs last-xs">
                        <AutoAffix viewportOffsetTop={50} container={this}>
                            <div className="ads">
                                <Ad
                                    url="https://ifelse.io/book"
                                    imageUrl="https://drtzvj8zd0k9x.cloudfront.net/assets/ads/react+in+action+meap+ad.png"
                                />

                                <Ad
                                    url="https://ifelse.io/book"
                                    imageUrl="https://drtzvj8zd0k9x.cloudfront.net/assets/ads/Yl48tQw.jpg"
                                />
                            </div>
                        </AutoAffix>
                    </div>
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
            actions: bindActionCreators({ createNewPost, getPosts }, dispatch)
        };
    }
)(Home);

export default HomeContainer;
