let join;
_cbb‍.w('path', [
    [
        'join',
        function(v) {
            join = v;
        }
    ]
]);
let writeFile;
_cbb‍.w('fs', [
    [
        'writeFile',
        function(v) {
            writeFile = v;
        }
    ]
]);
let promisify;
_cbb‍.w('util', [
    [
        'promisify',
        function(v) {
            promisify = v;
        }
    ]
]);
let slugify;
_cbb‍.w('slugify', [
    [
        'default',
        function(v) {
            slugify = v;
        }
    ]
]);
let address, lorem, date, random;
_cbb‍.w('faker', [
    [
        'address',
        function(v) {
            address = v;
        }
    ],
    [
        'lorem',
        function(v) {
            lorem = v;
        }
    ],
    [
        'date',
        function(v) {
            date = v;
        }
    ],
    [
        'random',
        function(v) {
            random = v;
        }
    ]
]);
let starwars;
_cbb‍.w('starwars', [
    [
        'default',
        function(v) {
            starwars = v;
        }
    ]
]);
let starWarsWords;
_cbb‍.w('forcem-ipsum', [
    [
        'default',
        function(v) {
            starWarsWords = v;
        }
    ]
]);
let mkdirp;
_cbb‍.w('mkdirp', [
    [
        'default',
        function(v) {
            mkdirp = v;
        }
    ]
]);
let _;
_cbb‍.w('lodash', [
    [
        'default',
        function(v) {
            _ = v;
        }
    ]
]);
let uuid;
_cbb‍.w('uuid/v4', [
    [
        'default',
        function(v) {
            uuid = v;
        }
    ]
]);
let ora;
_cbb‍.w('ora', [
    [
        'default',
        function(v) {
            ora = v;
        }
    ]
]);
let User, Comment, Like, Post;
_cbb‍.w('./models', [
    [
        'User',
        function(v) {
            User = v;
        }
    ],
    [
        'Comment',
        function(v) {
            Comment = v;
        }
    ],
    [
        'Like',
        function(v) {
            Like = v;
        }
    ],
    [
        'Post',
        function(v) {
            Post = v;
        }
    ]
]);

const { sample, random: rand, words } = _;

const write = promisify(writeFile);

function generateFakeContent(type, lim) {
    return starWarsWords(type, lim);
}

function generateProfilePicture() {
    const pics = [];
    for (let i = 0; i < 67; i++) {
        pics.push(`https://react-sh.s3.amazonaws.com/assets/profile-pictures/${i + 1}.jpeg`);
    }
    return function selectRandomProfilePicture() {
        return sample(pics);
    };
}
const createProfilePicture = generateProfilePicture();

function generateShareablePicture() {
    const pics = [];
    for (let i = 0; i < 16; i++) {
        pics.push(
            `https://s3-us-west-2.amazonaws.com/react-sh/assets/images-for-posts/${i + 1}.jpg`
        );
    }
    return function selectRandomPostImage() {
        return sample(pics);
    };
}
const createShareableImage = generateShareablePicture();

async function generateUser() {
    const config = {};
    config.name = generateFakeContent('characters', 1)[0];
    config.id = uuid();
    config.profilePicture = createProfilePicture();
    return new User(config);
}

// possible categories
function generatePost(userId) {
    const config = {};
    config.id = uuid();
    config.content = starwars();
    config.date = new Date(date.recent(sample([1, 2, 3, 4, 5, 10, 15])));
    config.image = Math.random() * 10 > 3 ? null : createShareableImage();
    config.likes = [];
    config.link = random.boolean()
        ? null
        : {
              url: 'https://ifelse.io/book',
              title: generateFakeContent('planets', 1)[0],
              description:
                  words(generateFakeContent('e6', 1)[0])
                      .slice(0, rand(5, 15))
                      .join(' ') + '.'
          };
    config.userId = userId;
    config.location = random.boolean()
        ? {
              lat: Number.parseFloat(address.latitude(), 10),
              lng: Number.parseFloat(address.longitude(), 10),
              name: generateFakeContent('planets', 1)[0]
          }
        : null;
    return new Post(config);
}

function generateComment(userId, postId) {
    const config = {};
    config.id = uuid();
    config.content = lorem.paragraph(sample([1, 2, 3]));
    config.date = date.recent(sample([1, 2, 3, 4, 5, 10, 15]));
    config.postId = postId;
    config.userId = userId;
    return new Comment(config);
}

function generateLike(userId, postId) {
    const config = {};
    config.userId = userId;
    config.postId = postId;
    return new Like(config);
}

async function generateUsers(n) {
    return await Promise.all([...Array(n).keys()].map(async () => await generateUser()));
}

function generateComments(n, users, posts) {
    const comments = [];
    for (let i = 0; i < n; i++) {
        const userIds = users.map(u => u.id);
        const postIds = posts.map(u => u.id);
        const randomUserId = sample(userIds);
        const randomPostId = sample(postIds);
        comments.push(generateComment(randomUserId, randomPostId));
    }
    return comments;
}

function generatePosts(n, users) {
    const posts = [];
    for (let i = 0; i < n; i++) {
        posts.push(generatePost(sample(users).id));
    }
    return posts;
}

function generateLikes(n, posts, users) {
    const likes = [];
    for (let i = 0; i < n; i++) {
        const userIds = users.map(u => u.id);
        const postIds = posts.map(u => u.id);
        for (let j = 0; j < rand(0, users.length); j++) {
            const randomUserId = sample(userIds);
            const randomPostId = sample(postIds);
            const post = posts.find(p => p.id === randomPostId);
            const newLike = generateLike(randomUserId, randomPostId);
            post.likes.push(newLike.id);
            likes.push(newLike);
        }
    }
    return likes;
}

(async function seed(nUsers = 10, nPosts = 50, nComments = 75, nLikes = 50) {
    const spinner = ora('Generating sample data...').start();
    mkdirp.sync(join(__dirname, 'seed'));
    const users = await generateUsers(nUsers);
    const posts = generatePosts(nPosts, users);
    const comments = generateComments(nComments, users, posts);
    const likes = generateLikes(nLikes, posts, users);
    try {
        await Promise.all([
            write(
                join(__dirname, 'seed', 'db.json'),
                JSON.stringify({
                    users,
                    posts,
                    comments,
                    likes
                })
            )
        ]);
        spinner.stop();
        console.log(`🎉 🎉 🎉 🎉  Done writing sample data 🎉 🎉 🎉 🎉
        generated:
        ${users.length} users
        ${posts.length} posts
        ${comments.length} comments
        ${likes.length} likes
        `);
    } catch (err) {
        console.error(err);
        spinner.stop();
    }
})();
