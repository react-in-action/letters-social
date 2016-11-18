import fetch from 'isomorphic-fetch';

export function createPost(payload) {
  if (!payload) {
    throw new Error('You must provide a payload when creating a new post');
  }
  // Create options for the request
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Send the new post to the API
  return fetch(`${process.env.ENDPOINT}/posts`, requestOptions).then(res => res.json());
}

export const fetchPosts = (n) => fetch(`${process.env.ENDPOINT}/posts?_limit=${n}&_sort=date&_order=DESC`).then(res => res.json());
