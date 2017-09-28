import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Ad from '../components/ad/Ad';
import Post from '../components/post/Post';
import Link from '../components/router/Link';

/**
 * Component for a single-post page
 * @module letters/components
 * @type {Object}
 */
export class SinglePost extends Component {
    static propTypes = {
        params: PropTypes.shape({
            postId: PropTypes.string.isRequired
        })
    };
    render() {
        return (
            <div className="single-post">
                <Link to="/">
                    <div className="back">
                        <i className="fa fa-arrow-left" /> Back
                    </div>
                </Link>
                <Post id={this.props.params.postId} />
                <Ad
                    url="https://www.manning.com/books/react-in-action"
                    imageUrl="/static/assets/ads/ria.png"
                />
            </div>
        );
    }
}

export default SinglePost;
