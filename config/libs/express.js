const express = require('express')
require('express-async-errors')
const logger = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const { ValidationError } = require('express-validation')

const routes = require('../../src/routes')

const codes = require('../constants/responseCodes')
const APIError = require('../../src/responses/APIError')

const app = express()

app.use(logger('tiny'))

app.use(helmet())
app.use(bodyParser.json({ type: 'application/json' }))

app.use('/', function(req, res, next) {
    if (req.method !== 'POST') {
        return next(new APIError('Request type forbidden', codes.BAD_REQUEST))
    }
    next()
}, routes)

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        err = new APIError('Validation Error', codes.BAD_REQUEST)
    } else if (!(err instanceof APIError)) {
        err = new APIError(err.message, codes.ERROR)
    }
    return next(err)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new APIError('API not found', codes.NOT_FOUND)
    return next(err)
})

app.use(function(err, req, res, next) {
    res.status(err.status).json(err)
})

module.exports = app
