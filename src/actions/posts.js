import * as types from '../constants/types';
import { createPost, fetchPosts, fetchPost } from '../shared/http';
import { loading, loaded } from './loading';

export function createNewPost(payload) {
    return dispatch => {
        dispatch(loading());
        return createPost(payload).then(() => {

        });
    };
}

export function fetchPosts(n) {
 return fetch(`${process.env.ENDPOINT}/posts?_limit=${n}&_sort=date&_order=DESC`).then(res => res.json());
}

export function fetchPost(id) {
  return fetch(`${process.env.ENDPOINT}/posts/${id}`).then(res => res.json());
}
