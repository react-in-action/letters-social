import { v4 as uuid } from 'node-uuid';

export class User {
    constructor(config) {
        this.id = config.id || uuid();
        this.name = config.name;
        this.profilePicture =
            config.profilePicture ||
            'https://react-sh.s3.amazonaws.com/assets/profile-pictures/1.jpeg';
    }
}

export class Post {
    constructor(config) {
        this.id = config.id || uuid();
        this.comments = config.comments || [];
        this.content = config.content || null;
        this.date = config.date || new Date();
        this.image = config.image || null;
        this.likes = config.likes || [];
        this.link = config.link || null;
        this.location = config.location || null;
        this.userId = config.userId;
    }
}

export class Like {
    constructor(config) {
        this.id = config.id || uuid();
        this.postId = config.postId;
        this.userId = config.userId;
    }
}

export class Comment {
    constructor(config) {
        this.id = config.id || uuid();
        this.content = config.content || null;
        this.date = config.date || new Date();
        this.likes = config.likes || 0;
        this.userId = config.userId;
        this.postId = config.postId;
    }
}
