let jsonAPI;_a4b‍.w('json-server',[["default",function(v){jsonAPI=v}]]);let resolve;_a4b‍.w('path',[["resolve",function(v){resolve=v}]]);let uuid;_a4b‍.w('uuid/v4',[["default",function(v){uuid=v}]]);let User,Comment,Post,Like;_a4b‍.w('../db/models',[["User",function(v){User=v}],["Comment",function(v){Comment=v}],["Post",function(v){Post=v}],["Like",function(v){Like=v}]]);





_a4b‍.d(function() {
    const server = jsonAPI.create();
    server.use(jsonAPI.defaults());
    server.use(jsonAPI.bodyParser);
    server.use((req, res, next) => {
        // NOTE: this is NOT something you'd do in production, just a simple way to restrict
        // the most basic nonsense on the interwebz
        if (!['https://social.react.sh', 'http://localhost:3000'].includes(req.headers.origin)) {
            return res.status(401).end('unauthorized');
        }
        next();
    });
    server.use((req, res, next) => {
        if (req.method === 'POST') {
            req.body.id = uuid();
            req.body.date = new Date();
            if (req.url.indexOf('/users') !== -1) {
                req.body = new User(req.body);
            }
            if (req.url.indexOf('/comments') !== -1) {
                req.body = new Comment(req.body);
            }
            if (req.url.indexOf('/posts') !== -1) {
                req.body = new Post(req.body);
            }
            if (req.url.indexOf('/likes') !== -1) {
                req.body = new Like(req.body);
            }
        }
        next();
    });
    server.use(jsonAPI.router(resolve(__dirname, '..', 'db', 'seed', 'db.json')));
    return server;
});
