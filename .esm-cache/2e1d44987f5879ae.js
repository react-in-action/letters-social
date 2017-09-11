_7f5‍.e([["User",()=>User],["Post",()=>Post],["Like",()=>Like],["Comment",()=>Comment]]);let uuid;_7f5‍.w('node-uuid',[["v4",function(v){uuid=v}]]);

class User {
    constructor(config) {
        this.id = config.id || config.uid || uuid();
        this.name = config.displayName || config.name;
        this.profilePicture =
            config.profilePicture || config.photoURL || '/static/assets/users/1.jpeg';
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
        this.userId = config.userId;
        this.postId = config.postId;
    }
}
