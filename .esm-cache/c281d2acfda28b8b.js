let fetch;_fda‍.w('isomorphic-fetch',[["default",function(v){fetch=v}]]);let path;_fda‍.w('path',[["default",function(v){path=v}]]);let fs;_fda‍.w('fs',[["default",function(v){fs=v}]]);let crypto;_fda‍.w('crypto',[["default",function(v){crypto=v}]]);




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
