import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AutoAffix } from 'react-overlays';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPost, getPosts } from '../actions/posts';

import Ad from '../components/ad/Ad';
import Post from '../components/post/Post';
import Link from '../components/router/Link';

class SinglePost extends Component {
    static propTypes = {
        params: PropTypes.shape({
            post: PropTypes.string
        })
    };

    componentDidMount() {
        // If there's no posts already loaded, load them
        if (!this.props.post) {
            this.props.actions.getPost(this.props.router.params.post);
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3">
                        <Link to="/">
                            <div className="pull-right">
                                <br />
                                <i className="fa fa-arrow-left" /> Back
                            </div>
                        </Link>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Post forceOpen post={this.props.post} />
                    </div>
                    <div className="col-sm-2 col-xs-12 last-xs">
                        <AutoAffix viewportOffsetTop={50} container={this}>
                            <Ad
                                url="https://www.manning.com/books/react-in-action"
                                imageUrl="https://drtzvj8zd0k9x.cloudfront.net/assets/ads/react+in+action+meap+ad.png"
                            />
                        </AutoAffix>
                    </div>
                </div>
            </div>
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
            actions: bindActionCreators({ getPost, getPosts }, dispatch)
        };
    }
)(SinglePost);
