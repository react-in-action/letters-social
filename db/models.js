import { name, internet, lorem, date, random } from 'faker';
import { sample, sampleSize, random as rand } from 'lodash';
import { v4 as uuid } from 'node-uuid';

import { categories } from './constants';

export function generateProfilePicture() {
    const pics = [];
    for (let i = 0; i < 15; i++) {
        pics.push(`https://drtzvj8zd0k9x.cloudfront.net/assets/profile-pictures/${i + 1}.png`);
    }
    return function selectRandomProfilePicture() {
        return sample(pics);
    };
}
const createProfilePicture = generateProfilePicture();

export function generateShareablePicture() {
    const pics = [];
    for (let i = 0; i < 50; i++) {
        pics.push(`https://drtzvj8zd0k9x.cloudfront.net/assets/post-images/${i + 1}.jpg`);
    }
    return function selectRandomPostImage() {
        return sample(pics);
    };
}

const createShareableImage = generateShareablePicture();

// possible categories

export function returnCategories() {
    return sampleSize(categories, rand(1, 15));
}

export class User {
    constructor() {
        this.id = uuid();
        this.email = internet.email();
        this.name = name.findName();
        this.profilePicture = createProfilePicture();
    }
}

export class Post {
    constructor(userId) {
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
                  url: internet.url(),
                  title: lorem.words(rand(1, 5)),
                  description: lorem.sentences(rand(1, 2), '. ')
              };
        this.userId = userId;
    }
}

export class Comment {
    constructor(userId, postId) {
        this.id = uuid();
        this.content = lorem.paragraph(sample([1, 2, 3]));
        this.date = date.recent(sample([1, 2, 3, 4, 5, 10, 15]));
        this.likes = random.number(1, 100);
        this.userId = userId;
        this.postId = postId;
    }
}
