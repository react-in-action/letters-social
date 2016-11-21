jest.mock('./http');
import { fetchPosts, createPost, fetchPost } from './http';

describe('fetchPosts', () => {
  it('should sould fetch posts',  async () => {
    const posts = await fetchPosts(3);
    expect(posts.length).toBe(3);
    posts.forEach(post => expect(post.id).toBeDefined());
  });
  it('should return a default number of posts', async () => {
    const posts = await fetchPosts();
    expect(posts.length).toBe(5);
  });
  it('should return posts with an ID', async () => {
    const posts = await fetchPosts();
    expect(posts[0]).toBeDefined();
  });
});

describe('createPost', () => {
  it('should let you create a post', async () => {
    const newPost = await createPost({ content: 'A post!' });
    expect(newPost).not.toBe(null);
    expect(newPost.id).toBeDefined();
  });
});

describe('fetchPost', () => {
  it('should fetch a post for you', async () => {
    const newPost = await fetchPost('12345');
    expect(newPost.id).toBeDefined();
  });
  it('should throw an error without an ID', async () => {
    expect(() => fetchPost()).toThrow();
  });
});
