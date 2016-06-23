// @flow

import { writeFile } from 'fs';
import { join } from 'path';
import { sample, sampleSize } from 'lodash';
import { name, internet, lorem, date, random, image } from 'faker';
import { v4 as uuid } from 'node-uuid';
import { promisify } from 'bluebird';
import ora from 'ora';

const write = promisify(writeFile);

class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  profilePicture: string;
  constructor() {
    this.email = internet.email();
    this.firstName = name.firstName();
    this.id = uuid();
    this.profilePicture = image.people();
    this.lastName = name.lastName();
    this.password = internet.password();
    this.username = internet.userName();
  }
}

class Post {
  comments: Array<Comment>;
  content: string;
  id: string;
  image: ?string;
  link: ?string;
  user: ?string;
  likes: number;
  constructor(user) {
    this.id = uuid();
    this.comments = [];
    this.content = lorem.paragraph(sample([1, 2, 3]));
    this.image = random.boolean() ? null : image.image();
    this.likes = random.number(1, 100);
    this.link = random.boolean() ? null : internet.url();
    this.user = user.id;
  }
}

class Comment {
  content: string;
  date: Date;
  id: string;
  likes: number;
  user: ?string;
  constructor(user) {
    this.id = uuid();
    this.content = lorem.paragraph(sample([1, 2, 3]));
    this.date = date.recent(sample([1, 2, 3, 4, 5, 10, 15]));
    this.likes = random.number(1, 100);
    this.user = user.id;
  }
}

function generateUsers(n) {
  const users = [];
  for (let i = 0; i < n; i++) {
    users.push(new User());
  }
  return users;
}

function generateComments(n: number, users: Array<any>) {
  const comments = [];
  for (let i = 0; i < n; i++) {
    comments.push(new Comment(sample(users)));
  }
  return comments;
}

function generatePosts(n: number, users: Array<User>, comments: Array<Comment>) {
  const posts = [];
  for (let i = 0; i < n; i++) {
    const newPost = new Post(sample(users));
    newPost.comments = sampleSize(comments, random.number(7));
    posts.push(newPost);
  }
  return posts;
}

export function seed(nUsers: number = 100, nPosts: number = 500, nComments: number = 500) {
  const spinner = ora('Generating sample data...').start();
  const users = generateUsers(nUsers);
  const comments = generateComments(nComments, users);
  const posts = generatePosts(nPosts, users, comments);
  Promise.all([
    write(join(__dirname, '..', 'db/seed/', 'db.json'), JSON.stringify({
      users,
      posts,
      comments,
    })),
  ])
  .then(() => {
    spinner.text = '🎉 🎉 🎉 🎉  Done writing sample data 🎉 🎉 🎉 🎉';
    setTimeout(() => spinner.stop(), 2000);
  })
  .catch(err => console.error(err));
}

seed();
