let jsonServer;_749‍.w('json-server',[["default",function(v){jsonServer=v}]]);let path;_749‍.w('path',[["default",function(v){path=v}]]);


const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './', 'seed', 'db.json'));
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => res.jsonp(req.query));

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.date = Date.now();
    }
    // Continue to JSON Server router
    next();
});

// Use default router
server.use(router);
server.listen(process.env.ENDPOINT_PORT || 3500, () => {
    console.log('JSON Server is running');
});
