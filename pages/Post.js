import React, { PropTypes, Component } from 'react';
import { AutoAffix } from 'react-overlays';

import { fetchPost } from '../src/shared/http';

import { Ad } from '../src/components/ad/Ad';
import { Post } from '../src/components/post/Post';
import { Link } from '../src/components/router/Link';

export class SinglePost extends Component {
    static propTypes = {
        params: PropTypes.shape({
            post: PropTypes.string
        })
    };
    constructor(props) {
        super(props);
        this.state = {
            post: null
        };
    }

    componentDidMount() {
        fetchPost(this.props.params.post).then(post => this.setState({ post }));
    }

    render() {
        return (
            this.state.post &&
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
                        <Post forceOpen post={this.state.post} />
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
