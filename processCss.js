const fs = require('fs')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const readdirp = require('readdirp')
const mkdirp = require('mkdirp');

mkdirp.sync('./lib/loading-css')

readdirp({ root: './src/loading-demos', fileFilter: 'loading.css' })
    .on('data', function (entry) {
        fs.readFile(entry.fullPath, (err, css) => {
            postcss([autoprefixer({
                browsers: ['> 1%', 'last 3 versions', 'iOS >= 6', 'android 4']
            })])
                .process(css, {from: entry.fullPath, to: `./lib/loading-css/${entry.parentDir}.css`})
                .then(result => {
                    fs.writeFile(`./lib/loading-css/${entry.parentDir}.css`, result.css)
                })
        })
    });