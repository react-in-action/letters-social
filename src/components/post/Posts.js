import React, { PropTypes } from 'react';
import Post from './Post';

function Posts(props) {
  return (
    <div className="posts">
      {props.posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.array,
};

export default Posts ;
