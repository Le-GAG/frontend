const path  = require('path');
const utils = require('../utils/utils');

const spriteRootFolder = utils.resolve('src/sprites');

module.exports = {
    // Path to www/assets (file)
    assetsPath:       utils.resolve('www/assets'),
    assetsPublicPath: 'assets/',

    sprite: {
        imagesFolder:        path.resolve(spriteRootFolder, 'images'),
        generatedImage:      path.resolve(spriteRootFolder, 'generated', 'sprite.png'),
        generatedStylesheet: path.resolve(spriteRootFolder, 'generated', 'sprite.scss'),
        template:            utils.resolve('build/templates/sprite.handlebars'),
    },

    versionNumber: process.env.CI_COMMIT_REF_NAME ? process.env.CI_COMMIT_REF_NAME : 'local',
    commitHash:    process.env.CI_COMMIT_SHA      ? process.env.CI_COMMIT_SHA      : 'local',
};
