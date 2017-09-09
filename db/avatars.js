import fetch from 'isomorphic-fetch';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const promises = [];
for (let i = 0; i < 100; i++) {
    promises.push(fetch('http://facetheforce.today/random/200'));
}
const unique = new Set();
Promise.all(promises)
    .then(results =>
        results.forEach((r, i) => {
            r.body.pipe(fs.createWriteStream(`avatars/${i}.jpeg`));
        })
    )
    .then(() => {
        const files = fs.readdirSync('avatars').filter(f => f.indexOf('.jpeg') !== -1);
        files.forEach(f => {
            const file = fs.readFileSync(path.resolve('avatars', f));
            const hash = crypto
                .createHash('sha256')
                .update(file)
                .digest('hex');
            if (!unique.has(hash)) {
                return unique.add(hash);
            }
            return fs.unlinkSync(path.resolve('avatars', f));
        });
    })
    .then(() => {
        const files = fs.readdirSync('avatars').filter(f => f.indexOf('.jpeg') !== -1);
        files.forEach((f, i) => {
            fs.renameSync(path.resolve('avatars', f), path.resolve('avatars', `${i}.jpeg`));
        });
    });
