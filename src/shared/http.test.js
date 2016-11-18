jest.mock('./http');
import { fetchPosts, createPost } from './http';

describe('fetchPosts', () => {
  it('should sould fetch posts',  async () => {
    const posts = await fetchPosts(3);
    const morePosts = await fetchPosts(10);
    expect(posts.length).toBe(3);
    expect(morePosts.length).toBe(10);
    expect(posts[0]).toBeInstanceOf(Object);
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
