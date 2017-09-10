import { User, Post } from '../../../db/models';

export function fetchPosts(n = 5) {
    const returnPayload = [];
    for (let i = 0; i < n; i++) {
        returnPayload.push(new User());
    }
    // imitate `.json()`
    const parsedReturnPayload = JSON.parse(JSON.stringify(returnPayload));
    return Promise.resolve(parsedReturnPayload);
}

export function fetchPost(id) {
    return Promise.resolve(JSON.parse(JSON.stringify(new Post())));
}

export function createPost(payload) {
    const newUser = new User();
    const newPost = new Post();
    newPost.user = newUser.id;
    return Promise.resolve(JSON.parse(JSON.stringify(newPost)));
}
