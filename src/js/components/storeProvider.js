if (process.env.NODE_ENV === 'production') {
	module.exports = require('./storeProvider.prod')
} else {
	module.exports = require('./storeProvider.dev')
}
