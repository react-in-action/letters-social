_b93‍.e([
    ['User', () => User],
    ['Post', () => Post],
    ['Like', () => Like],
    ['Comment', () => Comment]
]);
let uuid;
_b93‍.w('node-uuid', [
    [
        'v4',
        function(v) {
            uuid = v;
        }
    ]
]);

class User {
    constructor(config) {
        this.id = config.id || uuid();
        this.name = config.name;
        this.profilePicture =
            config.profilePicture ||
            'https://react-sh.s3.amazonaws.com/assets/profile-pictures/1.jpeg';
    }
}

class Post {
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

class Like {
    constructor(config) {
        this.id = config.id || uuid();
        this.postId = config.postId;
        this.userId = config.userId;
    }
}

class Comment {
    constructor(config) {
        this.id = config.id || uuid();
        this.content = config.content || null;
        this.date = config.date || new Date();
        this.likes = config.likes || 0;
        this.userId = config.userId;
        this.postId = config.postId;
    }
}
