module.exports = {
    setupFilesAfterEnv: [`${__dirname}/setup-tests.js`],
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/.d2/'],
}
