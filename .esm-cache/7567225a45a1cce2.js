let jsonAPI;_45a‍.w('json-server',[["default",function(v){jsonAPI=v}]]);let resolve;_45a‍.w('path',[["resolve",function(v){resolve=v}]]);let fetch;_45a‍.w('isomorphic-fetch',[["default",function(v){fetch=v}]]);let uuid;_45a‍.w('uuid/v4',[["default",function(v){uuid=v}]]);let config;_45a‍.w('config',[["default",function(v){config=v}]]);let User,Comment,Post,Like;_45a‍.w('../db/models',[["User",function(v){User=v}],["Comment",function(v){Comment=v}],["Post",function(v){Post=v}],["Like",function(v){Like=v}]]);







_45a‍.d(function() {
    const server = jsonAPI.create();
    server.use(jsonAPI.defaults());
    server.use(jsonAPI.bodyParser);
    server.use((req, res, next) => {
        // NOTE: this is NOT something you'd do in production, just a simple way to restrict
        // the most basic nonsense on the interwebz
        if (
            process.env.NODE_ENV === 'production' &&
            !['https://social.react.sh', 'http://localhost:3000'].includes(req.headers.origin)
        ) {
            return res.status(401).end('unauthorized');
        }
        return next();
    });
    server.use((req, res, next) => {
        if (req.method === 'POST') {
            req.body.id = uuid();
            req.body.date = new Date();
        }
        return next();
    });
    server.post('/users', (req, res, next) => {
        req.body = new User(req.body);
        return next();
    });
    server.post('/comments', (req, res, next) => {
        req.body = new Comment(req.body);
        return next();
    });
    server.post('/posts', (req, res, next) => {
        req.body = new Post(req.body);
        return next();
    });
    server.post('/likes', async (req, res, next) => {
        req.body = new Like(req.body);
        const { postId, userId, id } = req.body;
        // Get the post to update and check to see if we've liked it already
        const getPost = await fetch(
            `${config.get('ENDPOINT')}/posts/${postId}?_embed=comments&_expand=user&_embed=likes`
        );
        const post = await getPost.json();
        // Check to see if we already liked the post
        const alreadyLiked = post.likes.find(p => p.userId === userId);
        if (alreadyLiked) {
            return res.status(400).send();
        }
        // Update the post locally if necessary
        post.likes.push(id);
        await fetch(
            `${config.get('ENDPOINT')}/posts/${postId}?_embed=comments&_expand=user&_embed=likes`,
            {
                method: 'PUT',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return next();
    });
    // TODO: fix this
    server.delete('/posts/:postId/likes/:userId', async (req, res) => {
        const { userId, postId } = req.params;
        const post = await fetch(
            `${config.get('ENDPOINT')}/posts/${postId}?_embed=comments&_expand=user&_embed=likes`
        ).then(res => res.json());
        const existingLikeIndex = post.likes.map(like => like.userId).indexOf(userId);
        if (existingLikeIndex === -1) {
            return res.status(400).end();
        }
        // Remove the item from the array
        post.likes.splice(existingLikeIndex, 1);
        console.log(post);
        // Update the post
        const updatedPost = await fetch(`${config.get('ENDPOINT')}/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        console.log(updatedPost);
        return res.json(updatedPost);
    });
    server.use(jsonAPI.router(resolve(__dirname, '..', 'db', 'seed', 'db.json')));
    return server;
});
