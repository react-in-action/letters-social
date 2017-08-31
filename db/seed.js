import { join } from 'path';
import fetch from 'isomorphic-fetch';
import { name, internet, lorem, date, random } from 'faker';
import starwars from 'starwars';
import { promisify } from 'bluebird';
import mkdirp from 'mkdirp';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { writeFile } from 'fs';
import ora from 'ora';

const { sample, sampleSize, random: rand } = _;

const { categories, swapiURL } = require('./constants');

const write = promisify(writeFile);

function generateProfilePicture() {
    const pics = [];
    for (let i = 0; i < 15; i++) {
        pics.push(`https://react-sh.s3.amazonaws.com/assets/profile-pictures/${i + 1}.png`);
    }
    return function selectRandomProfilePicture() {
        return sample(pics);
    };
}
const createProfilePicture = generateProfilePicture();

function generateShareablePicture() {
    const pics = [];
    for (let i = 0; i < 50; i++) {
        pics.push(`https://drtzvj8zd0k9x.cloudfront.net/assets/post-images/${i + 1}.jpg`);
    }
    return function selectRandomPostImage() {
        return sample(pics);
    };
}
const createShareableImage = generateShareablePicture();

module.exports.UserFactory = {
    generate: async () => {
        const newUser = {};
        const countRes = await fetch(`${swapiURL}/people`);
        const { count } = await countRes.json();
        const personRes = await fetch(`${swapiURL}/people/${rand(0, count)}`);
        const swapiPerson = await personRes.json();
        newUser.name = swapiPerson.name || name.findName();
        newUser.email = internet.email();
        newUser.id = uuid();
        newUser.profilePicture = createProfilePicture();
        return newUser;
    }
};

// possible categories
module.exports.Post = class Post {
    constructor(userId) {
        this.id = uuid();
        this.categories = sampleSize(categories, rand(1, 15));
        this.content = starwars();
        this.date = date.recent(sample([1, 2, 3, 4, 5, 10, 15]));
        this.image = Math.random() * 10 > 3 ? null : createShareableImage();
        this.likes = random.number(1, 100);
        this.link = random.boolean()
            ? null
            : {
                  url: 'https://ifelse.io/book',
                  title: lorem.words(rand(1, 5)),
                  description: lorem.sentences(rand(1, 2), '. ')
              };
        this.userId = userId;
    }
};

module.exports.Comment = class Comment {
    constructor(userId, postId) {
        this.id = uuid();
        this.content = lorem.paragraph(sample([1, 2, 3]));
        this.date = date.recent(sample([1, 2, 3, 4, 5, 10, 15]));
        this.likes = random.number(1, 100);
        this.postId = postId;
        this.userId = userId;
    }
};

async function generateUsers(n) {
    return await Promise.all(
        [...Array(n).keys()].map(async () => await module.exports.UserFactory.generate())
    );
}

function generateComments(n, users, posts) {
    const comments = [];
    for (let i = 0; i < n; i++) {
        const userIds = users.map(u => u.id);
        const postIds = posts.map(u => u.id);
        const randomUser = sample(userIds);
        const randomPost = sample(postIds);
        comments.push(new module.exports.Comment(randomUser, randomPost));
    }
    return comments;
}

function generatePosts(n, users) {
    const posts = [];
    for (let i = 0; i < n; i++) {
        const newPost = new module.exports.Post(sample(users));
        posts.push(newPost);
    }
    return posts;
}

(async function seed(nUsers = 10, nPosts = 20, nComments = 25) {
    const spinner = ora('Generating sample data...').start();
    mkdirp.sync(join(__dirname, 'seed'));
    const users = await generateUsers(nUsers);
    const posts = generatePosts(nPosts, users);
    const comments = generateComments(nComments, users, posts);
    Promise.all([
        write(
            join(__dirname, 'seed', 'db.json'),
            JSON.stringify({
                users,
                posts,
                comments
            })
        )
    ])
        .then(() => {
            spinner.text = '🎉 🎉 🎉 🎉  Done writing sample data 🎉 🎉 🎉 🎉';
            setTimeout(() => spinner.stop(), 2000);
        })
        .catch(err => {
            console.error(err);
            setTimeout(() => spinner.stop());
        });
})();
