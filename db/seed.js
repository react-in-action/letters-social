const { join } = require('path');
const { name, internet, lorem, date, random } = require('faker');
const { promisify } = require('bluebird');
const mkdirp = require('mkdirp');
const { sample, sampleSize, random: rand } = require('lodash');
const { v4: uuid } = require('node-uuid');
const { writeFile } = require('fs');
const ora = require('ora');

const { categories } = require('./constants');

const write = promisify(writeFile);

function generateProfilePicture() {
    const pics = [];
    for (let i = 0; i < 15; i++) {
        pics.push(`https://drtzvj8zd0k9x.cloudfront.net/assets/profile-pictures/${i + 1}.png`);
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

module.exports.User = class User {
    constructor() {
        this.email = internet.email();
        this.firstName = name.firstName();
        this.id = uuid();
        this.profilePicture = createProfilePicture();
        this.lastName = name.lastName();
        this.password = internet.password();
        this.username = internet.userName();
    }
};

// possible categories

function returnCategories() {
    return sampleSize(categories, rand(1, 15));
}
module.exports.Post = class Post {
    constructor(user) {
        this.id = uuid();
        this.categories = returnCategories();
        this.comments = [];
        this.content = lorem.paragraph(sample([1, 2, 3]));
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
        this.user = user;
    }
};

module.exports.Comment = class Comment {
    constructor(user) {
        this.id = uuid();
        this.content = lorem.paragraph(sample([1, 2, 3]));
        this.date = date.recent(sample([1, 2, 3, 4, 5, 10, 15]));
        this.likes = random.number(1, 100);
        this.user = user;
    }
};

function generateUsers(n) {
    const users = [];
    for (let i = 0; i < n; i++) {
        users.push(new module.exports.User());
    }
    return users;
}

function generateComments(n, users) {
    const comments = [];
    for (let i = 0; i < n; i++) {
        comments.push(new module.exports.Comment(sample(users)));
    }
    return comments;
}

function generatePosts(n, users, comments) {
    const posts = [];
    for (let i = 0; i < n; i++) {
        const newPost = new module.exports.Post(sample(users));
        newPost.comments = sampleSize(comments, random.number(7));
        posts.push(newPost);
    }
    return posts;
}

module.exports.seed = function seed(
    nUsers = 500,
    nPosts = 2000,
    nComments = 750
) {
    const spinner = ora('Generating sample data...').start();
    mkdirp.sync(join(__dirname, 'seed'));
    const users = generateUsers(nUsers);
    const comments = generateComments(nComments, users);
    const posts = generatePosts(nPosts, users, comments);
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
};

module.exports.seed();
