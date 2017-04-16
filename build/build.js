// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';
import ora from 'ora';
import { join } from 'path';
import config from './webpack.config.prod';
import mkdirp from 'mkdirp';

process.env.NODE_ENV = 'production';

const spinner = ora(
    'Generating minified bundle for production. This will take a moment...'
).start();

mkdirp.sync(join(__dirname, 'dist'));

webpack(config).run((error, stats) => {
    if (error) {
        // so a fatal error occurred. Stop here.
        console.error(error);
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(err => console.error(err));
    }

    if (jsonStats.hasWarnings) {
        spinner.text = 'Webpack generated the following warnings:';
        jsonStats.warnings.map(warning => console.warn(warning));
    }

    spinner.text =
        "Your app is compiled in production mode in /dist. It's ready to roll!";
    console.log('\nApp successfully compiled!');
    setTimeout(() => spinner.stop(), 1000);
    return 0;
});
