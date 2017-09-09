import { v4 as uuid } from 'node-uuid';

export class User {
    constructor(config) {
        this.id = config.id || uuid();
        this.email = config.email;
        this.name = config.name || this.email;
        this.profilePicture =
            config.profilePicture ||
            'https://react-sh.s3.amazonaws.com/assets/profile-pictures/1.png';
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
        this.location = Object.assign(
            {
                lat: null,
                lng: null,
                name: null
            },
            config.location
        );
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
