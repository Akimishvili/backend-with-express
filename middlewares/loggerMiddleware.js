/**
 * @desc req.params => get variables from dynamic route
 * @desc req.query => get params from query string
 * @desc req.body => get data from request body
 */

const logger = (req, res, next) => {
    req.hello = 'Hello World'
    console.log('middleware run')
    next()
}

module.exports = logger