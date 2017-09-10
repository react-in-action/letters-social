import jsonAPI from 'json-server';
import { resolve } from 'path';
import uuid from 'uuid/v4';

import { User, Comment, Post, Like } from '../db/models';

export default function() {
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
}
