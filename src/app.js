import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parseLinkHeader from 'parse-link-header';
import orderBy from 'lodash/orderBy';

import ErrorMessage from './components/error/Error';
import Nav from './components/nav/navbar';
import Loader from './components/Loader';

import * as API from './shared/http';
import Ad from './components/ad/Ad';
import Post from './components/post/Post';
import Welcome from './components/welcome/Welcome';

/**
 * The app component serves as a root for the project and renders either children,
 * the error state, or a loading state
 * @method App
 * @module letters/components
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            posts: [],
            endpoint: `${process.env
                .ENDPOINT}/posts?_page=1&_sort=date&_order=DESC&_embed=comments&_expand=user&_embed=likes`,
        };
        this.getPosts = this.getPosts.bind(this);
    }
    static propTypes = {
        children: PropTypes.node,
    };
   

    // componentWillMount is deprecated, use componentDidMount instead
    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        console.log('App component will mount >>> ');
    }
    

    componentDidMount() {
        console.log('App component Did mount >>> ');
        // this.getPosts();
    }

    //생성자, render, 생명주기 메서드내에 수집되지 않는 에러들
    componentDidCatch(err, info) {
        console.error(err);
        console.error(info);
        this.setState(() => ({
            error: err,
        }));
    }
    componentWillRecceiveProps(nextProps) {
        console.log('App component will receive props >>> ', nextProps);   
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('App should component update >>> ', nextProps, nextState);
        return true; // or some condition based on nextProps or nextState
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('App component did update >>> ', prevProps, prevState);
    }
    
    componentWillUnmount() {
        console.log('App component will Unmount >>> '); 
    }

    getPosts() {
         console.log('this.state.endpoint >>', this.state.endpoint )
        API.fetchPosts(this.state.endpoint)
            .then(res => {
                // console.log('res.json() >>', res.json())
                res.json().then(posts => {
                    console.log('posts > ', posts)
                    const links = parseLinkHeader(res.headers.get('Link'));
                    console.log('links > ', links);
                    this.setState(() => ({
                        posts: orderBy(this.state.posts.concat(posts), 'date', 'desc'),
                        endpoint: links.next.url,
                        }));
                });
                // return res.json().then(posts => {
                //     const links = parseLinkHeader(res.headers.get('Link'));
                //     this.setState(() => ({
                //         posts: orderBy(this.state.posts.concat(posts), 'date', 'desc'),
                //         endpoint: links.next.url,
                //     }));
                // });
            })
            .catch(err => {
                this.setState(() => ({ error: err }));
            });
    }

    render() {
        console.log('App render >>> ');
        if (this.state.error) {
            return (
                <div className="app">
                    <ErrorMessage error={this.state.error} />
                </div>
            );
        }
        return (
            <div className="app">
                <Nav user={this.props.user} />
                {this.state.loading ? (
                    <div className="loading">
                        <Loader />
                    </div>
                ) : (
                    <div className="home">
                        <Welcome key="welcome" />
                        <div>
                            {this.state.posts.length && (
                                <div className="posts">
                                    {this.state.posts.map(({ id }) => {
                                        return <Post id={id} key={id} user={this.props.user} />;
                                    })}
                                </div>
                            )}
                            <button className="block" onClick={this.getPosts}>
                                Load more posts
                            </button>
                        </div>
                        <div>
                            <Ad
                                url="https://ifelse.io/book"
                                imageUrl="/static/assets/ads/ria.png"
                            />
                            <Ad
                                url="https://ifelse.io/book"
                                imageUrl="/static/assets/ads/orly.jpg"
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
