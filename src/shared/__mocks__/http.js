import { User, Post } from '../../../db/models';

export function fetchPosts(n = 5) {
  const returnPayload = [];
  for (let i = 0; i < n; i++) {
    returnPayload.push(new User());
  }
  // imitate `.JSON()`
  const parsedReturnPayload = JSON.parse(JSON.stringify(returnPayload));
  return Promise.resolve(parsedReturnPayload);
}

export function fetchPost(id) {
  if (!id) {
    throw new Error('Cannot fetch post without ID');
  }
  return Promise.resolve(
      JSON.parse(JSON.stringify(new Post()))
  );
}

export function createPost(payload) {
  if (!payload) {
    throw new Error('Cannot create a post from empty payload');
  }
  const newUser = new User();
  const newPost = new Post();
  newPost.user = newUser.id;
  return Promise.resolve(JSON.parse(JSON.stringify(newPost)));
}
